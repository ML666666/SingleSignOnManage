// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'

import gob from './gob'
Vue.prototype.$gob = gob;

Vue.config.productionTip = false
import { 
   pagination,
   dialog,
   Button,
   Select,
   Input,
   MessageBox,
   Message,
   Badge,
   Menu,
   Table,
   TableColumn,
   Submenu,
   MenuItem,
   MenuItemGroup,
   Form,
   FormItem,
   Option,
   Checkbox,
   CheckboxButton,
   CheckboxGroup,
   Row,
   Col,
  } from 'element-ui';
import 'element-ui/lib/theme-chalk/base.css';// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(dialog);
Vue.use(Input);
Vue.use(Badge);
Vue.use(Menu);
Vue.use(pagination);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
// Vue.use(MessageBox);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
/* eslint-disable no-new */
import 'element-ui/lib/theme-chalk/display.css';
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
