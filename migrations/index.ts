import * as migration_20260912_174509_phase2_platform_skeleton from './20260912_174509_phase2_platform_skeleton';
import * as migration_20260912_205555_phase3_forms_persist from './20260912_205555_phase3_forms_persist';
import * as migration_20260913_090647_phase4_operations from './20260913_090647_phase4_operations';

export const migrations = [
  {
    up: migration_20260912_174509_phase2_platform_skeleton.up,
    down: migration_20260912_174509_phase2_platform_skeleton.down,
    name: '20260912_174509_phase2_platform_skeleton',
  },
  {
    up: migration_20260912_205555_phase3_forms_persist.up,
    down: migration_20260912_205555_phase3_forms_persist.down,
    name: '20260912_205555_phase3_forms_persist',
  },
  {
    up: migration_20260913_090647_phase4_operations.up,
    down: migration_20260913_090647_phase4_operations.down,
    name: '20260913_090647_phase4_operations'
  },
];
