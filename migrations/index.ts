import * as migration_20260912_174509_phase2_platform_skeleton from './20260912_174509_phase2_platform_skeleton';
import * as migration_20260912_205555_phase3_forms_persist from './20260912_205555_phase3_forms_persist';
import * as migration_20260913_090647_phase4_operations from './20260913_090647_phase4_operations';
import * as migration_20260913_192757_phase6_remove_placeholder_fields from './20260913_192757_phase6_remove_placeholder_fields';
import * as migration_20260913_193200_phase6_content_model from './20260913_193200_phase6_content_model';
import * as migration_20260913_193524_phase6_single_story_summary from './20260913_193524_phase6_single_story_summary';
import * as migration_20260913_210321_phase6_statistics_remove_per_page from './20260913_210321_phase6_statistics_remove_per_page';
import * as migration_20260913_210326_phase6_statistics_single_figures from './20260913_210326_phase6_statistics_single_figures';
import * as migration_20260913_211551_phase6_statistics_partnership_figures from './20260913_211551_phase6_statistics_partnership_figures';
import * as migration_20260914_062219_phase6_homepage_remove_placeholders from './20260914_062219_phase6_homepage_remove_placeholders';
import * as migration_20260914_062226_phase6_homepage_blocks from './20260914_062226_phase6_homepage_blocks';
import * as migration_20260914_114112_phase6_media_remove_image_paths from './20260914_114112_phase6_media_remove_image_paths';
import * as migration_20260914_114118_phase6_media_library_images from './20260914_114118_phase6_media_library_images';
import * as migration_20260914_122152_phase6_slugs_and_redirects from './20260914_122152_phase6_slugs_and_redirects';
import * as migration_20260914_190531_phase6_events_and_video from './20260914_190531_phase6_events_and_video';
import * as migration_20260915_071710_phase6_story_video from './20260915_071710_phase6_story_video';
import * as migration_20260916_123601_phase6_hero_slide_eyebrow from './20260916_123601_phase6_hero_slide_eyebrow';
import * as migration_20260916_130833_phase6_story_programme from './20260916_130833_phase6_story_programme';
import * as migration_20260916_133032_phase6_story_media_testimonies from './20260916_133032_phase6_story_media_testimonies';
import * as migration_20260916_135555_phase6_story_parts_and_support from './20260916_135555_phase6_story_parts_and_support';
import * as migration_20260916_145214_phase6_video_highlight_files from './20260916_145214_phase6_video_highlight_files';
import * as migration_20260916_154420_phase6_heart_of_foundation from './20260916_154420_phase6_heart_of_foundation';
import * as migration_20260916_172718_phase6_stories_in_motion from './20260916_172718_phase6_stories_in_motion';

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
    name: '20260913_210326_phase6_statistics_single_figures',
  },
  {
    up: migration_20260913_211551_phase6_statistics_partnership_figures.up,
    down: migration_20260913_211551_phase6_statistics_partnership_figures.down,
    name: '20260913_211551_phase6_statistics_partnership_figures',
  },
  {
    up: migration_20260914_062219_phase6_homepage_remove_placeholders.up,
    down: migration_20260914_062219_phase6_homepage_remove_placeholders.down,
    name: '20260914_062219_phase6_homepage_remove_placeholders',
  },
  {
    up: migration_20260914_062226_phase6_homepage_blocks.up,
    down: migration_20260914_062226_phase6_homepage_blocks.down,
    name: '20260914_062226_phase6_homepage_blocks',
  },
  {
    up: migration_20260914_114112_phase6_media_remove_image_paths.up,
    down: migration_20260914_114112_phase6_media_remove_image_paths.down,
    name: '20260914_114112_phase6_media_remove_image_paths',
  },
  {
    up: migration_20260914_114118_phase6_media_library_images.up,
    down: migration_20260914_114118_phase6_media_library_images.down,
    name: '20260914_114118_phase6_media_library_images',
  },
  {
    up: migration_20260914_122152_phase6_slugs_and_redirects.up,
    down: migration_20260914_122152_phase6_slugs_and_redirects.down,
    name: '20260914_122152_phase6_slugs_and_redirects',
  },
  {
    up: migration_20260914_190531_phase6_events_and_video.up,
    down: migration_20260914_190531_phase6_events_and_video.down,
    name: '20260914_190531_phase6_events_and_video',
  },
  {
    up: migration_20260915_071710_phase6_story_video.up,
    down: migration_20260915_071710_phase6_story_video.down,
    name: '20260915_071710_phase6_story_video',
  },
  {
    up: migration_20260916_123601_phase6_hero_slide_eyebrow.up,
    down: migration_20260916_123601_phase6_hero_slide_eyebrow.down,
    name: '20260916_123601_phase6_hero_slide_eyebrow',
  },
  {
    up: migration_20260916_130833_phase6_story_programme.up,
    down: migration_20260916_130833_phase6_story_programme.down,
    name: '20260916_130833_phase6_story_programme',
  },
  {
    up: migration_20260916_133032_phase6_story_media_testimonies.up,
    down: migration_20260916_133032_phase6_story_media_testimonies.down,
    name: '20260916_133032_phase6_story_media_testimonies',
  },
  {
    up: migration_20260916_135555_phase6_story_parts_and_support.up,
    down: migration_20260916_135555_phase6_story_parts_and_support.down,
    name: '20260916_135555_phase6_story_parts_and_support',
  },
  {
    up: migration_20260916_145214_phase6_video_highlight_files.up,
    down: migration_20260916_145214_phase6_video_highlight_files.down,
    name: '20260916_145214_phase6_video_highlight_files',
  },
  {
    up: migration_20260916_154420_phase6_heart_of_foundation.up,
    down: migration_20260916_154420_phase6_heart_of_foundation.down,
    name: '20260916_154420_phase6_heart_of_foundation',
  },
  {
    up: migration_20260916_172718_phase6_stories_in_motion.up,
    down: migration_20260916_172718_phase6_stories_in_motion.down,
    name: '20260916_172718_phase6_stories_in_motion'
  },
];
