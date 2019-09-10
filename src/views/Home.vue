<template>
  <div id="app">
    <landing v-if="! userSession.isUserSignedIn()"></landing>
    <AppDashboard v-if="user" :user="user"></AppDashboard>

  </div>
</template>

<script>
import Landing from '@/components/Landing.vue'
import Dashboard from '@/components/Dashboard.vue'
import AppDashboard from '@/views/AppDashboard.vue'
import { Person } from 'blockstack'
import { userSession } from '../userSession'

export default {
  name: 'Home',
  components: { Landing, Dashboard, AppDashboard },
  created () {
    this.userSession = userSession
  },
  mounted () {
    if (userSession.isUserSignedIn()) {
      this.userData = userSession.loadUserData();
      this.user = new Person(this.userData.profile);
      this.user.username = this.userData.username;
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
        .then((userData) => {
          window.location = window.location.origin;
        })
    }
  },
  data () {
    return {
      userSession: null,
      user: this.$store.getters.user,
    }
  },
  methods: {
  }
}
</script>
