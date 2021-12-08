<template>
  <div class="d-flex flex-column flex-root">
    <div
      id="kt_login"
      class="login login-1 d-flex flex-column flex-lg-row flex-column-fluid bg-white"
      :class="{
        'login-signin-on': state == 'signin',
        'login-forgot-on': state == 'forgot',
      }"
    >
      <!-- 'login-signup-on': state == 'signup', -->
      <!--begin::Aside-->
      <div
        class="login-aside d-flex flex-column flex-row-auto"
        style="background-color: #F2C98A;"
      >
        <div class="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <a
            href="#"
            class="text-center mb-10"
          >
            <img
              src="media/logos/kelimecomlogo.png"
              class="max-h-70px"
              alt=""
            >
          </a>
          <h3
            class="font-weight-bolder text-center font-size-h4 font-size-h1-lg"
            style="color: #986923;"
          >
            Basılı Sözlükler Veritabanı
          </h3>
        </div>
        <div
          class="aside-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center"
          :style="{ backgroundImage: `url(${backgroundImage})` }"
        />
      </div>
      <!--begin::Aside-->
      <!--begin::Content-->
      <div
        class="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto"
      >
        <div class="d-flex flex-column-fluid flex-center">
          <!--begin::Signin-->
          <div class="login-form login-signin">
            <form
              id="kt_login_signin_form"
              class="form"
              novalidate="novalidate"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  {{ $t('AUTH.LOGIN.WELLCOME') }}
                </h3>
                <!-- <span
                  class="text-muted font-weight-bold font-size-h4"
                >{{ $t('AUTH.LOGIN.NEW_HERE') }}
                  <a
                    id="kt_login_signup"
                    class="text-primary font-weight-bolder"
                    @click="showForm('signup')"
                  >{{ $t('AUTH.REGISTER.TITLE') }}</a></span> -->
              </div>
              <div class="form-group">
                <label
                  class="font-size-h6 font-weight-bolder text-dark"
                >{{ $t('AUTH.INPUT.EMAIL') }}</label>
                <div
                  id="example-input-group-1"
                  label=""
                  label-for="example-input-1"
                >
                  <input
                    ref="email"
                    v-model="form.email"
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="text"
                    name="email"
                  >
                </div>
              </div>
              <div class="form-group">
                <div
                  class="d-flex justify-content-between mt-n5"
                >
                  <label
                    class="font-size-h6 font-weight-bolder text-dark pt-5"
                  >{{ $t('AUTH.INPUT.PASSWORD') }}</label>
                  <a
                    id="kt_login_forgot"
                    class="text-primary font-size-h6 font-weight-bolder text-hover-primary pt-5"
                    @click="showForm('forgot')"
                  >{{ $t('AUTH.FORGOT.TITLE') }}</a>
                </div>
                <div
                  id="example-input-group-2"
                  label=""
                  label-for="example-input-2"
                >
                  <input
                    ref="password"
                    v-model="form.password"
                    class="form-control form-control-solid h-auto py-7 px-6 rounded-lg"
                    type="password"
                    name="password"
                    autocomplete="off"
                  >
                </div>
              </div>
              <div class="pb-lg-0 pb-5">
                <button
                  ref="kt_login_signin_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-15 py-4 my-3 mr-3"
                >
                  {{ $t('AUTH.LOGIN.BUTTON') }}
                </button>
              </div>
            </form>
          </div>
          <!--end::Signin-->
          <!--begin::Signup-->
          <!-- <div class="login-form login-signup">
            <form
              id="kt_login_signup_form"
              class="form"
              novalidate="novalidate"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  {{ $t('AUTH.REGISTER.TITLE') }}
                </h3>
                <p
                  class="text-muted font-weight-bold font-size-h4"
                >
                  {{ $t('AUTH.REGISTER.DESC') }}
                </p>
              </div>
              <div class="form-group">
                <input
                  ref="fullname"
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="text"
                  :placeholder="$t('AUTH.INPUT.FULLNAME')"
                  name="fullname"
                  autocomplete="off"
                >
              </div>
              <div class="form-group">
                <input
                  ref="remail"
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="email"
                  :placeholder="$t('AUTH.INPUT.EMAIL')"
                  name="email"
                  autocomplete="off"
                >
              </div>
              <div class="form-group">
                <input
                  ref="rpassword"
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  :placeholder="$t('AUTH.INPUT.PASSWORD')"
                  name="password"
                  autocomplete="off"
                >
              </div>
              <div class="form-group">
                <input
                  ref="cpassword"
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="password"
                  :placeholder="
                    $t('AUTH.INPUT.CONFIRM_PASSWORD')
                  "
                  name="cpassword"
                  autocomplete="off"
                >
              </div>
              <div class="form-group">
                <label class="checkbox mb-0">
                  <input
                    type="checkbox"
                    name="agree"
                  >
                  <span class="mr-2" />
                  {{ $t('AUTH.GENERAL.IAGREE') }}
                  <a
                    href="#"
                    class="ml-2"
                  >{{
                    $t('AUTH.GENERAL.TERMS')
                  }}</a>.
                </label>
              </div>
              <div
                class="form-group d-flex flex-wrap pb-lg-0 pb-3"
              >
                <button
                  ref="kt_login_signup_submit"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                  style="width:150px;"
                >
                  {{ $t('AUTH.GENERAL.SUBMIT_BUTTON') }}
                </button>
                <button
                  id="kt_login_signup_cancel"
                  type="button"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('signin')"
                >
                  {{ $t('AUTH.GENERAL.CANCEL_BUTTON') }}
                </button>
              </div>
            </form>
          </div> -->
          <!--end::Signup-->
          <!--begin::Forgot-->
          <div class="login-form login-forgot">
            <!--begin::Form-->
            <form
              id="kt_login_forgot_form"
              ref="kt_login_forgot_form"
              class="form"
              novalidate="novalidate"
            >
              <div class="pb-13 pt-lg-0 pt-5">
                <h3
                  class="font-weight-bolder text-dark font-size-h4 font-size-h1-lg"
                >
                  {{ $t('AUTH.FORGOT.TITLE') }}
                </h3>
                <p
                  class="text-muted font-weight-bold font-size-h4"
                >
                  {{ $t('AUTH.FORGOT.DESC') }}
                </p>
              </div>
              <div class="form-group">
                <input
                  ref="remail"
                  v-model="rform.email"
                  class="form-control form-control-solid h-auto py-7 px-6 rounded-lg font-size-h6"
                  type="email"
                  :placeholder="$t('AUTH.INPUT.EMAIL')"
                  name="email"
                  autocomplete="off"
                >
              </div>
              <div class="form-group d-flex flex-wrap pb-lg-0">
                <button
                  id="kt_login_forgot_submit"
                  type="button"
                  class="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-4"
                >
                  {{ $t('AUTH.GENERAL.SUBMIT_BUTTON') }}
                </button>
                <button
                  id="kt_login_forgot_cancel"
                  type="button"
                  class="btn btn-light-primary font-weight-bolder font-size-h6 px-8 py-4 my-3"
                  @click="showForm('login')"
                >
                  {{ $t('AUTH.GENERAL.CANCEL_BUTTON') }}
                </button>
              </div>
            </form>
          </div>
          <!--end::Forgot-->
        </div>
        <!--begin::Content footer-->
        <!-- <div
          class="d-flex justify-content-lg-start justify-content-center align-items-end py-7 py-lg-0"
        >
          <a
            href="#"
            class="text-primary font-weight-bolder font-size-h5"
          >{{ $t('AUTH.GENERAL.LEGAL') }}</a>
          <a
            href="#"
            class="text-primary ml-10 font-weight-bolder font-size-h5"
          >{{ $t('AUTH.GENERAL.CONDITIONS') }}</a>
          <a
            href="#"
            class="text-primary ml-10 font-weight-bolder font-size-h5"
          >{{ $t('AUTH.GENERAL.CONTACT') }}</a>
        </div> -->
        <!--end::Content footer-->
      </div>
      <!--end::Content-->
    </div>
  </div>
</template>

<!-- Load login custom page styles -->
<style lang="scss">
@import '@/assets/sass/pages/login/login-1.scss';
</style>

<script>
import { mapGetters, mapState } from 'vuex';
import Swal from 'sweetalert2';
import formValidation from '@/assets/plugins/formvalidation/dist/es6/core/Core';

// FormValidation plugins
import Trigger from '@/assets/plugins/formvalidation/dist/es6/plugins/Trigger';
import Bootstrap from '@/assets/plugins/formvalidation/dist/es6/plugins/Bootstrap';
import SubmitButton from '@/assets/plugins/formvalidation/dist/es6/plugins/SubmitButton';

import KTUtil from '@/assets/js/components/util';
import { LOGIN, LOGOUT, FORGOT } from '@/core/services/store/auth.module';

export default {
  name: 'Login1',
  data() {
    return {
      state: 'signin',
      // Remove this dummy login info
      form: {
        email: '',
        password: '',
      },
      rform: {
        email: '',
      },
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors,
    }),
    ...mapGetters(['currentUser']),

    backgroundImage() {
      return (
        `${process.env.BASE_URL
        }media/svg/illustrations/gummy-programming.svg`
      );
    },
  },
  mounted() {
    const signin_form = KTUtil.getById('kt_login_signin_form');
    const forgot_form = KTUtil.getById('kt_login_forgot_form');

    this.fv = formValidation(signin_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: 'Username is required',
            },
          },
        },
        password: {
          validators: {
            notEmpty: {
              message: 'Password is required',
            },
          },
        },
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap(),
      },
    });

    this.fv.on('core.form.valid', () => {
      const { email, password } = this.form;

      // clear existing errors
      this.$store.dispatch(LOGOUT);

      // set spinner to submit button
      const submitButton = this.$refs.kt_login_signin_submit;
      submitButton.classList.add(
        'spinner',
        'spinner-light',
        'spinner-right',
      );

      // dummy delay
      setTimeout(() => {
        // send login request
        this.$store
          .dispatch(LOGIN, { email, password })
        // go to which page after successfully login
          .then(() => this.$router.push({ name: 'dashboard' }))
          .catch((error) => {
            console.log('error: ', error);
            Swal.fire({
              title: 'Hata',
              text: error.message,
              icon: 'error',
              confirmButtonClass: 'btn btn-secondary',
              heightAuto: false,
            });
          });

        submitButton.classList.remove(
          'spinner',
          'spinner-light',
          'spinner-right',
        );
      }, 1000);
    });

    this.fv.on('core.form.invalid', () => {
      Swal.fire({
        title: '',
        text: 'Please, provide correct data!',
        icon: 'error',
        confirmButtonClass: 'btn btn-secondary',
        heightAuto: false,
      });
    });

    this.fv2 = formValidation(forgot_form, {
      fields: {
        email: {
          validators: {
            notEmpty: {
              message: 'Email is required',
            },
            emailAddress: {
              message: 'The value is not a valid email address',
            },
          },
        },
      },
      plugins: {
        trigger: new Trigger(),
        submitButton: new SubmitButton(),
        bootstrap: new Bootstrap(),
      },
    });

    this.fv2.on('core.form.valid', () => {
      const email = this.rform.email;

      // set spinner to submit button
      const submitButton = this.$refs.kt_login_forgot_form;
      submitButton.classList.add(
        'spinner',
        'spinner-light',
        'spinner-right',
      );

      // dummy delay
      setTimeout(() => {
        // send register request
        this.$store
          .dispatch(FORGOT, {
            email,
          })
          .then(() => {
            Swal.fire({
              title: '',
              text: 'Lütfen epostanızı kontrol ediniz!',
              icon: 'warning',
              confirmButtonClass: 'btn btn-secondary',
              heightAuto: false,
            }).then(() => this.$router.push({ name: 'login' }));
          });

        submitButton.classList.remove(
          'spinner',
          'spinner-light',
          'spinner-right',
        );
      }, 1000);
    });

    this.fv2.on('core.form.invalid', () => {
      Swal.fire({
        title: '',
        text: 'Please, provide correct data!',
        icon: 'error',
        confirmButtonClass: 'btn btn-secondary',
        heightAuto: false,
      });
    });
  },
  methods: {
    showForm(form) {
      this.state = form;
      const form_name = `kt_login_${form}_form`;
      KTUtil.animateClass(
        KTUtil.getById(form_name),
        'animate__animated animate__backInUp',
      );
    },
  },
};
</script>
