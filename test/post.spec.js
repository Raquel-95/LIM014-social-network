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
