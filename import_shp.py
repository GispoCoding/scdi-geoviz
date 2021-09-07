#!/usr/bin/env python

import pandas
import re
from datetime import datetime
from geopandas import read_file

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
print(datasets)
print(years)

# create geodataframes from all non-zero points, add timestamps
for dataset in datasets:
    yearly_frames = []
    for year in years:
        print(dataset)
        print(year)
        col = dataset + year
        # filter truthy points
        if df[col].dtype == 'O':
            data_to_add = df[(df[col] != 'NA') &
                             (df[col] != 'NANA') &
                             (df[col].notnull())]
        elif df[col].dtype == 'float64' or 'int64':
            data_to_add = df[df[col] > 0]
        # a bit stupid to have to have hours in yearly data
        timestamp = datetime(year=int(year), month=12, day=31, hour=12, minute=0)
        yearly_data = data_to_add[[col, 'BorderCell', 'countries', 'geometry']].rename({col: dataset}, axis='columns')
        yearly_data.insert(0, 'datetime', timestamp)
        yearly_data = yearly_data.set_index('datetime', append=True)
        yearly_frames.append(yearly_data)
    gdf = pandas.concat(yearly_frames).sort_index()
    gdf.to_file(f"frontend/public/data/{dataset}.json", driver="GeoJSON")
    gdf.to_csv(f"frontend/public/data/{dataset}.csv")
    dataframes[dataset] = gdf
print(dataframes)
