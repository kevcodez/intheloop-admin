import Vue from 'vue'

// Import global components
import { Button, Select, Input, Switch, Tag, Option, ColorPicker, DatePicker } from 'element-ui'

// Internationalization: http://element.eleme.io/#/en-US/component/i18n
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// Configure language
locale.use(lang)

// Configure global components
Vue.use(Button)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Select)
Vue.use(Tag)
Vue.use(ColorPicker)
Vue.use(Option)
Vue.use(DatePicker)
