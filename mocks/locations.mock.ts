import { Location, LocationLevel } from 'models/location.model';

export const allLocations: Location[] = [
  {
    locationId: 1,
    locationName: 'Singapore',
    levelInfo: {
      atLevel: LocationLevel.LEVEL0
    }
  },
  {
    locationId: 2,
    locationName: 'Brinny',
    levelInfo: {
      atLevel: LocationLevel.LEVEL0
    }
  },
  {
    locationId: 3,
    locationName: 'API',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 4,
    locationName: 'Biotech',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 5,
    locationName: 'DPI',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 6,
    locationName: 'Pharm South',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 7,
    locationName: 'Pharm West',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 8,
    locationName: 'SCM',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 9,
    locationName: 'Warehouse',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 1
    }
  },
  {
    locationId: 10,
    locationName: 'API',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 10,
    locationName: 'Data Integrity',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 11,
    locationName: 'Engineering COE',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 12,
    locationName: 'Fermentation',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 12,
    locationName: 'Labs',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 13,
    locationName: 'MMD-IT',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 14,
    locationName: 'Materials Management',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 15,
    locationName: 'Quality Assurance',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 16,
    locationName: 'Sterile IPT',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 17,
    locationName: 'Tech Ops',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 17,
    locationName: 'Vaccines-IPT',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  },
  {
    locationId: 18,
    locationName: 'Warehouse',
    levelInfo: {
      atLevel: LocationLevel.LEVEL1,
      level0Id: 2
    }
  }
];
