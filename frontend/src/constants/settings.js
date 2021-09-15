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
    label: "Country boundaries",
    type: "json",
  },
  countries: {
    id: "countries",
    label: "Countries",
    type: "json",
  },
  evC: {
    id: "evC",
    label: "Conflicts per year",
    type: "csv"
  },
  ftl: {
    id: "ftl",
    label: "Fatalities per year",
    type: "csv"
  },
  Dns: {
    id: "Dns",
    label: "Conflicts per year per sq km",
    type: "csv"
  },
  NN_I: {
    id: "NN_I",
    label: "Nearest-neighbor index",
    type: "csv"
  },
  dn_: {
    id: "dn_",
    label: "Density classification",
    type: "csv"
  },
  NN_: {
    id: "NN_",
    label: "Nearest-neighbor classification",
    type: "csv"
  },
  SCDI: {
    id: "SCDI",
    label: "SCDi score",
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
  },
  {
    id: "events",
    readOnly: false,
    minZoom: 2,
    maxZoom: 8,
    enabled: true,
    stripUi: false,
    details: {
      en: {
        label: "Conflict events in North and West Africa",
        detail: "Aggregated number of conflict events per cell per year.",
        desc: "Aggregated conflict events per cell form the basis of the SCDi",
      }
    },
    statistics: [],
    datasets: [
      DATASETS.boundaries,
      DATASETS.countries,
      DATASETS.evC
    ]
  },
  {
    id: "fatalities",
    readOnly: false,
    minZoom: 2,
    maxZoom: 8,
    enabled: true,
    stripUi: false,
    details: {
      en: {
        label: "Fatalities in conflicts in North and West Africa",
        detail: "Aggregated number of conflict fatalities per cell per year.",
        desc: "Fatalities tell us more about the scale of the local conflicts",
      }
    },
    statistics: [],
    datasets: [
      DATASETS.boundaries,
      DATASETS.countries,
      DATASETS.ftl
    ]
  }
]
