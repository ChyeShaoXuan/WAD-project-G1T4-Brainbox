import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, onValue, get} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js"
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyCEjW5Rq4jgHbSS1GCJy0pl6hpPrFQ9pUI",
    authDomain: "wad2-4fc9e.firebaseapp.com",
    projectId: "wad2-4fc9e",
    storageBucket: "wad2-4fc9e.appspot.com",
    messagingSenderId: "83590678050",
    appId: "1:83590678050:web:6c98cdb011612eb4f5ac7b",
    measurementId: "G-NY0ZMNMQLZ",
    databaseURL: "https://wad2-4fc9e-default-rtdb.asia-southeast1.firebasedatabase.app"
    };
  

const app = initializeApp(firebaseConfig);
const db = getDatabase()
const postsRef = ref(db, 'posts/english');
let postsUL = document.getElementById('posts')
let newStr = ''
let postsList = []
let uid = ''
const userRef = ref(db,'users')
const currSub = 'english'
let currPost = null
function displayPage(page) {
    postsList = []
    newStr = ''
    onValue(userRef, (snapshot) => {
        const users = snapshot.val()
        onValue(postsRef,(snapshot2) => {
            snapshot2.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const postDetails = childSnapshot.val();
                uid = postDetails.uid
                postsList.push([childKey,postDetails,users[postDetails.uid].image,users[postDetails.uid].username])
            });
            postsList = postsList.reverse()
            console.log(postsList)
            let firstPage = (page-1)*5
            let lastPage = page*5
            for (let i=firstPage;i<lastPage;i++) {
                if (i >= postsList.length) {
                    break;
                }
                console.log(i)
                currPost = postsList[i]
                newStr+= `
                    <li class="list-group-item p-3">
                                            <div class="flex flex-col items-center md:flex-row">
                                                <div class="w-full md:w-1/2 md:mb-0 text-center">
                                                    <a href="post.html?postID=${currPost[0]}&subject=${currSub}" class="text-blue-900 font-semibold hover:text-red-900">${currPost[1].title}</a>
                                                </div>
                                                <div class="w-1/2 md:w-1/8 md:w-1/4">
                                                    <div class="flex items-center">
                                                        <div class="w-1/2">
                                                            <img src="../Images/${currPost[2]}" class="w-10 h-10 rounded-full">
                                                        </div>
                                                        <div class="w-1/2">
                                                            <span style="font-size: 15px;">${currPost[3]}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style="margin-top:1px;" class="w-1/2 md:w-1/8 md:w-1/4 md:mt-0">
                                                    Replies: ${currPost[1].comments}
                                                </div>
                                                <div style="margin-top:1px;" class="w-1/2 md:w-1/8 md:w-1/4 md:mt-0">
                                                    Views: ${currPost[1].views}
                                                </div>
                                            </div>
                                        </li>`
            }
            document.getElementById('posts').innerHTML = newStr

        },{
            onlyOnce:true
        });
    }, {
        onlyOnce:true
    });
}


document.addEventListener('DOMContentLoaded', () => {
    displayPage(1)
})

document.getElementById('english').addEventListener('click', () => {
    displayPage(2)
})
document.getElementById('create').addEventListener('click', function() {
    window.location.href = 'create.html';
})

