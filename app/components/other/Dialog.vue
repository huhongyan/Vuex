<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-label="Close"  @click="close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div class="modal-body">
          <p>{{msg}}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" @click="close">Close</button>
          <button type="button" class="btn btn-primary" @click="confirm">Save changes</button>
        </div>
      </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
  </div><!-- /.modal -->
</template>
<script>
  import {getDialogTitle, getDialogMsg, getDialogHandler} from '../../vuex/getters'
  import {hideDialog} from '../../vuex/actions/dialog'
  export default {
      vuex: {
          getter: {
              title: getDialogTitle,
              msg: getDialogMsg,
              handler: getDialogHandler
          },
          actions: {
              hideDialog
          }
      },
      methods: {
          close: function () {
              this.hideDialog();
          },
          confirm: function () {
              this.handler();
              this.hideDialog();
          }
      }
  }
</script>
