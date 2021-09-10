# scdi-geoviz

[Kepler.gl](https://kepler.gl) visualization of the [OECD Sahel and West Africa Club Secretariat](https://www.oecd.org/swac/) [Spatial Conflict Dynamics indicator](https://oecd-development-matters.org/2019/10/17/mapping-the-geography-of-political-violence-in-north-and-west-africa/)

## Requirements

- Python >= 3.8
## How to get started

We recommend creating your own conda env, pyenv, or pyenv which contains conda wheels. The last option should make installing all dependencies easier:

```
pyenv install miniconda-latest
pyenv local miniconda-latest
pip install -r requirements.txt
```

You must have your SCDi shapefile in `dataset` directory. The import script will create all datasets in csv and json formats for use in kepler.gl. They are saved in the `frontend/public/data` directory:

```
python ./import_shp.py
```


## Data license 

Included are international boundary data from [World Bank](https://datacatalog.worldbank.org/dataset/world-bank-official-boundaries) [CC-BY 4.0](https://datacatalog.worldbank.org/public-licenses#cc-by).