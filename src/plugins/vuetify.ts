import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'
import Vuetify, {
	VApp,
	VAppBar,
	VTabs,
	VTabsSlider,
	VTab,
  VCard,
	VCardText,
	VFooter,
	VContent,
	VContainer,
	VFlex,
	VLayout,
	VList,
	VListItem,
	VIcon
} from 'vuetify/lib'
import { Touch } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
		VApp,
		VAppBar,
		VTabs,
		VTabsSlider,
		VTab,
		VCard,
		VCardText,
		VFooter,
		VContent,
		VContainer,
		VFlex,
		VLayout,
		VList,
		VListItem,
		VIcon	
  },
  directives: {
    Touch,
  },
})

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
		iconfont: 'fa'
		}
});