import MapsModalFactory from '../components/maps-modal';

export const MAPS_MODAL_OPTIONS = {
  id: 'iconInfo',
  template: MapsModalFactory(),
  modalProps: {
    title: '',
  }
};

export const DATASETS = {
  boundaries: {
    id: "boundaries",
    label: "World bank country boundaries",
    type: "json",
  },
  countries: {
    id: "countries",
    label: "World bank countries",
    type: "json",
  },
  evC: {
    id: "evC",
    label: "Number of conflict events per year",
    type: "csv"
  },
  ftl: {
    id: "ftl",
    label: "Number of conflict fatalities per year",
    type: "csv"
  },
  Dns: {
    id: "Dns",
    label: "Number of conflict events per year per square kilometer",
    type: "csv"
  },
  NN_I: {
    id: "NN_I",
    label: "The Average Nearest Neighbor (ANN) Index of the conflict events of the year",
    type: "csv"
  },
  dn_: {
    id: "dn_",
    label: "The classification of the cell's density score: H if over 0.0017 events / square kilometers, and L if under.",
    type: "csv"
  },
  NN_: {
    id: "NN_",
    label: "The classification of the cell's ANN Index: C if less than 1, D if less than or equal to 1.",
    type: "csv"
  },
  SCDI: {
    id: "SCDI",
    label: " The SCDi score, which is a concatenation of density and ANN classification.",
    type: "csv"
  }
}

export const MAP_CONFIGS = [
  {
    id: "scdi",
    readOnly: false,
    minZoom: 2,
    maxZoom: 8,
    enabled: true,
    stripUi: false,
    details: {
      en: {
        label: "Spatial Conflict Dynamics indicator",
        detail: "Articulating between point pattern and areal spatial analyses, the SCDi allows conflict researchers and analysts to not just map which regions experience the most violence but to track how the geography of conflict evolves over time. The SCDi identifies four spatial typologies of violence and can leverage political event data from most datasets with locational information and can be used for analyses across large multi-state regions, within a single state, or in more localized contexts. Conflicts are categorized as high-density (H) or low-density (L), and centralized (C) or dispersed (D).",
        desc: "SCDi uses a 50x50 kilometer grid to categorize conflicts. Categories for each grid cell will vary over time.",
        dataurl: "https://www.tandfonline.com/doi/abs/10.1080/09546553.2021.1957846?af=R&journalCode=ftpv20"
      }
    },
    statistics: [],
    datasets: [
      DATASETS.boundaries,
      DATASETS.countries,
      DATASETS.SCDI
    ]
  }
]
