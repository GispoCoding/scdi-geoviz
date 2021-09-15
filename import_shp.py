#!/usr/bin/env python

import pandas
import re
from datetime import datetime
from geopandas import read_file

merge_datasets = [
    ['Dns', 'ftl'],
    ['NN_', 'dn_', 'SCDI']
]

df = read_file("dataset/SCDi.shp")
# reproject to EPSG:4326 for Kepler
df = df.to_crs("EPSG:4326")

# get years and dataset headlines from file
years = set()
datasets = set()
dataframes = {}
for col in df.columns:
    data_year_pattern = r"([a-zA-Z_]{3,4})([0-9]{4})"
    match = re.match(data_year_pattern, col)
    if match:
        datasets.add(match.group(1))
        years.add(match.group(2))
# generate merged datasets, in addition to single datasets
datasets = list(datasets) + merge_datasets

# create geodataframes from all non-zero points, add timestamps
for dataset in datasets:
    yearly_frames = []
    for year in years:
        print(dataset)
        print(year)
        columns = {dataset} if isinstance(dataset, str) else dataset

        # pick selected columns from the whole set
        cols = [column + year for column in columns]
        # filter points that have at least one non-zero value in any of the datasets
        not_null_query = ""
        for col in cols:
            # a single not null column is enough
            if not_null_query:
                not_null_query += "|"
            # filter truthy points
            if df[col].dtype == 'O':
                not_null_query += f"(({col} != \'NA\') & ({col} != \'NANA\') & ({col}.notnull()))"
            elif df[col].dtype == 'float64' or 'int64':
                not_null_query += f"({col} > 0)"
        data_to_add = df.query(not_null_query, engine='python')
        yearly_data = data_to_add[[*cols, 'BorderCell', 'countries', 'geometry']]
        # rename column to get rid of year suffix
        for col, dataset_name in zip(cols, columns):
            yearly_data = yearly_data.rename({col: dataset_name}, axis='columns')

        # a bit stupid to have to have hours in yearly data, but here we go
        timestamp = datetime(year=int(year), month=12, day=31, hour=12, minute=0)
        yearly_data.insert(0, 'datetime', timestamp)
        # BorderCell will have to be reformatted so Kepler detects bool values
        yearly_data['BorderCell'] = yearly_data['BorderCell'].apply(
            lambda value: True if value == 'Yes' else False)
        yearly_data = yearly_data.set_index('datetime', append=True)
        yearly_frames.append(yearly_data)

    gdf = pandas.concat(yearly_frames).sort_index()
    # Kepler also wants point data for heatmaps etc.
    centroids = gdf['geometry'].apply(
        lambda geom: geom.centroid
    )
    gdf['lon'] = centroids.apply(
        lambda centroid: centroid.x
    )
    gdf['lat'] = centroids.apply(
        lambda centroid: centroid.y
    )

    dataset_name = dataset if isinstance(dataset, str) else '_'.join(dataset)
    gdf.to_file(f"frontend/public/data/{dataset_name}.json", driver="GeoJSON")
    gdf.to_csv(f"frontend/public/data/{dataset_name}.csv")
    dataframes[dataset_name] = gdf

print(dataframes)
