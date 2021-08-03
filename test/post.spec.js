import MockFirebase from 'mock-cloud-firestore';

import {
    getPosts, getPost, deletePosts, updatePost, publishPost, likesPost
} from '../src/lib/feedservice.js';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        post001: {
          description: 'me gusta viajar',
          idUser: '001',
        //   name: 'Giuliana',
        //   photo: '../img/icon.jpg',
          likes: ['001'],
          timePost: '13 may. 2021 7:29 p. m.',
          orderDate: '20210413192948',
          photo: '../img/icon.jpg'
        },
        post002: {
            description: 'me gusta viajar',
            idUser: '002',
          //   name: 'Giuliana',
          //   photo: '../img/icon.jpg',
            likes: ['002'],
            timePost: '13 may. 2021 7:29 p. m.',
            orderDate: '20210413192948',
            photo: '../img/icon.jpg'
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData);

describe('addPost', () => {
  it('It should add a post', (done) => publishPost('001', 'fearless', '../img/icon.jpg')
    .then(() => 
    getPosts().then((data)=>{
        data.forEach((doc) => {
            const post = doc.data();
            if(post.description === 'fearless'){
                expect(post.description).toBe('fearless');
                done();
            }
        })
    })));
});

describe('updatePost', () => {
  it('It should update a post', (done) => updatePost('post001', 'primer viaje', '../img/icon.jpg')
     .then(() => getPosts().then((data)=>{
        data.forEach((doc) => {
            const post = doc.data();
            if(post.description === 'primer viaje'){
                expect(post.description).toBe('primer viaje');
                done();
            }
        })
    })
    ));
});


describe('deletePosts', () => {
  it('It should delete a post', (done) => deletePosts('post001')
    .then(() => getPosts().then((data) => {
        data.forEach((doc)=>{
        const post = doc.data();
        if(post.description === 'me gusta viajar'){ 
            expect(post.id).toBe(undefined);
                done();
            }
            })   
      },
    )));
});

describe('addLike', () => {
  it('It should update likes', (done) => likesPost('post002', '002')
    .then(() => getPosts().then((data)=>{
        data.forEach((doc)=>{
        const post = doc.data();
        if(post.likes === '002'){ 
            expect(post.likes).toBe('002');
                done();
            }
        })
    })
    ));
});






// import MockFirebase from 'mock-cloud-firestore';

// const fixtureData = {
//     __collection__: {
//         post: {
//             __doc__: {
//                 abc123: {
//                     idUser: 'xyz12',
//                     description: 'primera publicacion',
//                     timePost: '20/6/2021 23:15:34',
//                     likes: []
//                 },
//                 abc125: {
//                     idUser: 'xyz14',
//                     description: 'segunda publicacion',
//                     timePost: '20/6/2021 23:15:45',
//                     likes: []
//                 },
//             }
//         }
//     }
// }

// global.firebase = new MockFirebase(fixtureData);
// import { getPost, getPosts, deletePosts, updatePost, publishPost, likesPost } from "../src/lib/feedservice.js";

// describe('lista de notas', () => {
//     const descriptionTest = 'primera publicacion';
//     const idUsers = 'xyz12';

//     it('Debería porder agregar una nota', (done) => {
//         publishPost(idUsers, descriptionTest)
//             .then(() => {
//                 getPosts().then((data) => {
//                         const list = []
//                         data.forEach((doc) => {
//                             list.push({ id: doc.id, ...doc.data() })
//                         });
//                         const result = list.find((post) => post.description === descriptionTest);
//                         expect(result.description).toBe(descriptionTest);
//                         done()
//                     }
//                 )
//             })
//     });
// })

// describe('lista de notas', () => {
//     const descriptionTest = 'primera publicacion';
//     it('Debería poder eliminar una publicacion con id:xyz12', (done) => {
//         deletePosts('xyz14')
//             .then(() => {
//                 getPosts().then((data) => {
//                         const list = []
//                         data.forEach((doc) => {
//                             list.push({ id: doc.id, ...doc.data() })
//                         });
//                         const result = list.find((post) => post.idUser === 'xyz14');
//                         expect(result.idUser).toBe(undefined);
//                         done()
//                     }
//                 )
//             })
//       })})



// const fixtureData = {
//   __collection__: {
//     posts: {
//       __doc__: {
//         post001: {
//           content: 'me gusta viajar',
//           idUser: '001',
//         //   name: 'Giuliana',
//           photo: '../img/icon.jpg',
//           counterLikes: ['001'],
//           date: '13 may. 2021 7:29 p. m.',
//           orderDate: '20210413192948',
//           postImgUrl: '../img/icon.jpg'
//         },
//         post002: {
//           content: 'esta es una red social',
//           id: '002',
//           name: 'Raquel',
//           photo: '../img/icon.jpg',
//           counterLikes: ['1312TS1988'],
//           date: '12 may. 2021 7:29 p. m.',
//           orderDate: '20210412192948',
//           postImgUrl: '../img/icon.jpg'
//         },
//       },
//     },
//   },
// };