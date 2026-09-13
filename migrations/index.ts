import * as migration_20260912_174509_phase2_platform_skeleton from './20260912_174509_phase2_platform_skeleton';
import * as migration_20260912_205555_phase3_forms_persist from './20260912_205555_phase3_forms_persist';
import * as migration_20260913_090647_phase4_operations from './20260913_090647_phase4_operations';
import * as migration_20260913_192757_phase6_remove_placeholder_fields from './20260913_192757_phase6_remove_placeholder_fields';
import * as migration_20260913_193200_phase6_content_model from './20260913_193200_phase6_content_model';
import * as migration_20260913_193524_phase6_single_story_summary from './20260913_193524_phase6_single_story_summary';
import * as migration_20260913_210321_phase6_statistics_remove_per_page from './20260913_210321_phase6_statistics_remove_per_page';
import * as migration_20260913_210326_phase6_statistics_single_figures from './20260913_210326_phase6_statistics_single_figures';

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
    name: '20260913_090647_phase4_operations',
  },
  {
    up: migration_20260913_192757_phase6_remove_placeholder_fields.up,
    down: migration_20260913_192757_phase6_remove_placeholder_fields.down,
    name: '20260913_192757_phase6_remove_placeholder_fields',
  },
  {
    up: migration_20260913_193200_phase6_content_model.up,
    down: migration_20260913_193200_phase6_content_model.down,
    name: '20260913_193200_phase6_content_model',
  },
  {
    up: migration_20260913_193524_phase6_single_story_summary.up,
    down: migration_20260913_193524_phase6_single_story_summary.down,
    name: '20260913_193524_phase6_single_story_summary',
  },
  {
    up: migration_20260913_210321_phase6_statistics_remove_per_page.up,
    down: migration_20260913_210321_phase6_statistics_remove_per_page.down,
    name: '20260913_210321_phase6_statistics_remove_per_page',
  },
  {
    up: migration_20260913_210326_phase6_statistics_single_figures.up,
    down: migration_20260913_210326_phase6_statistics_single_figures.down,
    name: '20260913_210326_phase6_statistics_single_figures'
  },
];
