<script>
  /* global Flash */
  import '~/flash';
  import playIconSvg from 'icons/_icon_play.svg';
  import eventHub from '../event_hub';
  import loadingIcon from '../../vue_shared/components/loading_icon.vue';

  export default {
    props: {
      actions: {
        type: Array,
        required: true,
      },
    },
    components: {
      loadingIcon,
    },
    data() {
      return {
        playIconSvg,
        isLoading: false,
      };
    },
    methods: {
      onClickAction(endpoint) {
        this.isLoading = true;

        $(this.$refs.tooltip).tooltip('destroy');

        eventHub.$emit('postAction', endpoint);
      },

      isActionDisabled(action) {
        if (action.playable === undefined) {
          return false;
        }

        return !action.playable;
      },
    },
  };
</script>
<template>
  <div class="btn-group">
    <button
      type="button"
      class="dropdown-new btn btn-default has-tooltip js-pipeline-dropdown-manual-actions"
      title="Manual job"
      data-toggle="dropdown"
      data-placement="top"
      aria-label="Manual job"
      ref="tooltip"
      :disabled="isLoading">
      <span v-html="playIconSvg"></span>
      <i
        class="fa fa-caret-down"
        aria-hidden="true">
      </i>
      <loading-icon v-if="isLoading" />
    </button>

    <ul class="dropdown-menu dropdown-menu-align-right">
      <li v-for="action in actions">
        <button
          type="button"
          class="js-pipeline-action-link no-btn btn"
          @click="onClickAction(action.path)"
          :class="{ disabled: isActionDisabled(action) }"
          :disabled="isActionDisabled(action)">
          <span v-html="playIconSvg"></span>
          <span>{{action.name}}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
