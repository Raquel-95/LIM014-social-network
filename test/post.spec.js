import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
    __collection__: {
        post: {
            __doc__: {
                abc123: {
                    idUser: 'xyz12',
                    description: 'primera publicacion',
                    timePost: '20/6/2021 23:15:34',
                    likes: []
                },
                abc125: {
                    idUser: 'xyz14',
                    description: 'segunda publicacion',
                    timePost: '20/6/2021 23:15:45',
                    likes: []
                },
            }
        }
    }
}

global.firebase = new MockFirebase(fixtureData);
import { getPost, getPosts, deletePosts, updatePost, publishPost, likesPost } from "../src/lib/feedservice.js";

describe('lista de notas', () => {
    const descriptionTest = 'primera publicacion';
    const idUsers = 'xyz12';

    it('Debería porder agregar una nota', (done) => {
        publishPost(idUsers, descriptionTest)
            .then(() => {
                getPosts().then((data) => {
                        const list = []
                        data.forEach((doc) => {
                            list.push({ id: doc.id, ...doc.data() })
                        });
                        const result = list.find((post) => post.description === descriptionTest);
                        expect(result.description).toBe(descriptionTest);
                        done()
                    }
                )
            })
    });
})

describe('lista de notas', () => {
    const descriptionTest = 'primera publicacion';
    it('Debería poder eliminar una publicacion con id:xyz12', (done) => {
        deletePosts('xyz14')
            .then(() => {
                getPosts().then((data) => {
                        const list = []
                        data.forEach((doc) => {
                            list.push({ id: doc.id, ...doc.data() })
                        });
                        const result = list.find((post) => post.idUser === 'xyz14');
                        expect(result.idUser).toBe(undefined);
                        done()
                    }
                )
            })
      })})