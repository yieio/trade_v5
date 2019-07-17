import { createSimpleTransition } from 'vuetify/es5/util/helpers'

const topSheetTransition = createSimpleTransition('top-sheet-transition')

Vue.component('top-sheet-transition', topSheetTransition)