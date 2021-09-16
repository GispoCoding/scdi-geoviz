# scdi-geoviz

[Kepler.gl](https://kepler.gl) visualization of the [OECD Sahel and West Africa Club Secretariat](https://www.oecd.org/swac/) [Spatial Conflict Dynamics indicator](https://oecd-development-matters.org/2019/10/17/mapping-the-geography-of-political-violence-in-north-and-west-africa/).

This is a simple adaptation of [ngz-geoviz](https://github.com/GispoCoding/ngz-geoviz) without the Django backend. This simplified static Kepler setup is suitable for non-realtime datasets that do not require a backend server, especially historical time series datasets that do not change.

## Requirements

- Python >= 3.8 (for importing the data)
- Node >= 16 (for running the visualization app)

## How to get started
### Data import

We recommend creating your own conda env:

```
conda create -n scdi-geoviz
conda activate scdi-geoviz
conda install -c conda-forge --file requirements.txt
```

Alternatively, if you are using pyenv, use a miniconda pyenv which contains conda wheels to make installing all dependencies easier:

```
pyenv install miniconda-latest
pyenv local miniconda-latest
pip install -r requirements.txt
```

You must have your SCDi shapefile in `dataset` directory. The import script will create all datasets in csv and json formats for use in kepler.gl. They are saved in the `frontend/public/data` directory:

```
python ./import_shp.py
```

### Data visualization

```
npm install yarn
cd frontend
yarn
yarn start
```

or read the full instructions for developing the React app in [/frontend/README.md](/frontend/README.md).

## Adding new datasets and maps

Let's assume you want to add a dataset by the name `myData` and possibly a new map config `myConfig`.

1. Place the data in `frontend/public/data` directory in either csv or json format. File name is `myData.csv` or `myData.json`.
2. Id `myData`, label and type of the dataset must be defined in `frontend/src/constants/settings.js`. In the same file, you may add the dataset in an existing map config or add a new config `myConfig` for the dataset.
3. The Kepler map configs for each map view are in `frontend/public/config`. Edit an existing view config or add `myConfig.json` if you added a new map config.
4. If you added a new map config, add a preview image `myConfig.png` of your map in the menu to `frontend/public/images`.

## Data license 

Included are international boundary data from [World Bank](https://datacatalog.worldbank.org/dataset/world-bank-official-boundaries) [CC-BY 4.0](https://datacatalog.worldbank.org/public-licenses#cc-by).
