const firestore = () => {
    return {
        collection: (nameCollection) => {
            return {
                get: (objData) => {
                    return new Promise((resolve) => {
                        resolve('hello')
                    })
                 }
            }
        }
    }
}

const firebase = {
    firestore: firestore
}

// convertir firebase en una mock function 
export default jest.fn(() => { // recibe como argumento una funcion que va a retornar nuestro firebse
    return firebase; 
})