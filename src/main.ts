import 'primeflex/primeflex.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import './assets/main.css'
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";     
//core
import "primevue/resources/primevue.min.css";

import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import BadgeDirective from 'primevue/badgedirective';
import Badge from 'primevue/badge';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Galleria from 'primevue/galleria';
import InlineMessage from 'primevue/inlinemessage';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Knob from 'primevue/knob';
import Menu from 'primevue/menu';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import Password from 'primevue/password';
import ProgressBar from 'primevue/progressbar';
import RadioButton from 'primevue/radiobutton';
import Rating from 'primevue/rating';
import Ripple from 'primevue/ripple';
import Sidebar from 'primevue/sidebar';
import Slider from 'primevue/slider';
import SelectButton from 'primevue/selectbutton';
import StyleClass from 'primevue/styleclass';
import TabMenu from 'primevue/tabmenu';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import ToggleButton from 'primevue/togglebutton';
import Tooltip from 'primevue/tooltip';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import { setupCalendar } from 'v-calendar';

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(router)
app.use(setupCalendar, {})

app.config.globalProperties.$appState = reactive({ theme: 'lara-light-indigo', dark: false });
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Avatar', Avatar);
app.component('AvatarGroup', AvatarGroup);
app.component('Badge', Badge);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Carousel', Carousel);
app.component('Checkbox', Checkbox);
app.component('Chip', Chip);
app.component('Dialog', Dialog);
app.component('Divider', Divider);
app.component('Dropdown', Dropdown);
app.component('FileUpload', FileUpload);
app.component('Galleria', Galleria);
app.component('InlineMessage', InlineMessage);
app.component('InputMask', InputMask);
app.component('InputNumber', InputNumber);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Knob', Knob);
app.component('Menu', Menu);
app.component('Message', Message);
app.component('MultiSelect', MultiSelect);
app.component('Password', Password);
app.component('ProgressBar', ProgressBar);
app.component('RadioButton', RadioButton);
app.component('Rating', Rating);
app.component('Sidebar', Sidebar);
app.component('SelectButton', SelectButton);
app.component('Slider', Slider);
app.component('TabMenu', TabMenu);
app.component('TabPanel', TabPanel);
app.component('TabView', TabView);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('ToggleButton', ToggleButton);
app.component('Toast', Toast);
// app.component('BlockViewer', BlockViewer);

app.directive('badge', BadgeDirective);
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);

app.mount('#app')
