import Vue from 'vue';
import commitPipelinesTable from './pipelines_table.vue';

/**
 * Used in:
 *  - Commit details View > Pipelines Tab > Pipelines Table.
 *  - Merge Request details View > Pipelines Tab > Pipelines Table.
 *  - New Merge Request View > Pipelines Tab > Pipelines Table.
 */

const CommitPipelinesTable = Vue.extend(commitPipelinesTable);

document.addEventListener('DOMContentLoaded', () => {
  const pipelineTableViewEl = document.querySelector('#commit-pipeline-table-view');

  if (pipelineTableViewEl && pipelineTableViewEl.dataset.disableInitialization === undefined) {
    const table = new CommitPipelinesTable({
      propsData: {
        endpoint: pipelineTableViewEl.dataset.endpoint,
        helpPagePath: pipelineTableViewEl.dataset.helpPagePath,
      },
    }).$mount();
    pipelineTableViewEl.appendChild(table.$el);
  }
});
