<template>
    <div class="app">
        <Navbar />
        <div class="row justify-content-center">
            <div class="col-md-5">
                <div v-if="!isUpdate">
                    <h3 class="text-center">Add Subscription</h3>
                </div>
                <div v-if="isUpdate">
                    <h3 class="text-center">Edit Subscription</h3>
                </div>
                <form @submit.prevent="onFormSubmit">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="subscription.name" required>
                    </div>

                    <div class="form-group">
                        <label>Description</label>
                        <input type="text" class="form-control" v-model="subscription.description" required>
                    </div>
                    <br>
                    <div class="form-group">
                        <label>Amount</label>
                        <input type="text" class="form-control" v-model="subscription.amount" required>
                    </div>
                    <div class="form-group">
                        <label>Payment Frequency</label>
                        <select id='frequency' class="form-control" v-model="subscription.frequency" required>
                            <option value='weekly'>Weekly</option>
                            <option value='bimonthly'>Bi-monthly</option>
                            <option value='monthly'>Monthly</option>
                            <option value='quarterly'>Quarterly</option>
                            <option value='biannually'>Bi-annually</option>
                            <option value='annually'>Annually</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" class="form-control" v-model="subscription.date" required>
                    </div>
                    <div class="form-group">
                        <div v-if="!isUpdate" type="button" class="btn btn-primary col-4" @click="addSubscription">Save
                        </div>
                        <div v-if="isUpdate" type="button" class="btn btn-primary btn-block"
                            @click="updateSubscription">Update</div>
                        <button class="btn btn-primary col-4" @click="cancelOperation">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import db from '../firebaseDb'
import Navbar from '../components//Navbar.vue'
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
const subsCollectionRef = collection(db, 'subscriptions') // Database collection reference

export default {
    name: 'CreateUpdate',
    components: {
        Navbar
    },
    data() {
        return {
            subscription: {},
            isUpdate: false,
            user: ''
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("log_user"));
        if (this.$route.params.id) {
            this.isUpdate = true;
            //populate the subscription record to be edited
            const docSnap = this.getRecord(this.$route.params.id)
        }
        else {
            this.isUpdate = false;
        }
    },
    mounted() {
 
        if (this.$route.params.id) {
            this.subscription = {};
            this.isUpdate = true;
        }
        else {
            this.isUpdate = false;
        }
    },
    methods: {
        async getRecord(id) {
            let docRef = doc(subsCollectionRef, id);
            try {
                const docSnap = await getDoc(docRef);
 
                this.subscription.name = docSnap.data().name;
                this.subscription.description = docSnap.data().description;
                this.subscription.frequency = docSnap.data().frequency;
                this.subscription.username = docSnap.data().username;
                this.subscription.amount = docSnap.data().amount;
                this.subscription.date = docSnap.data().date;


            } catch (error) {
                console.log(error)
            }
        },
        addSubscription() {
            if (this.subscription.name.length !== 0 &&
                this.subscription.description.length !== 0) {
                this.subscription.username = this.user; // save with username
                addDoc(subsCollectionRef, this.subscription).then(() => {
                    this.subscription.name = ''
                    this.subscription.description = ''
                    this.subscription.amount = ''
                    this.subscription.frequency = ''
                    this.subscription.username = ''
                    this.subscription.date = ''
                    this.$router.push('/subscriptionsList')
                })
                this.error = true;
                this.errorMsg = "Please fill out the subscription name and description"
                setTimeout(() => {
                    this.error = false;
                }, 5000)
            }
        },
        cancelOperation() {
            this.$router.push('/subscriptionsList')
        },
        onUpdateForm(event) {
            event.preventDefault()
        },
        updateSubscription() {
            updateDoc(doc(subsCollectionRef, this.$route.params.id), this.subscription).then(() => {
                this.$router.push('/subscriptionsList')
            }).catch((error) => {
                console.log(error)
                alert('Error updating subscription');
                this.$router.push('/subscriptionsList')
            })
        },
    }
}
</script>
