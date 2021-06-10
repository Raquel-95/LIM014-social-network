const firestore = () => {
    return {
        collection: (nameCollection) => {
            return {
                add: (objData) => {
                    return new Promise((resolve) => {
                        resolve('la nota fue agregada')
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
export default jest.fn(() => {
    return firebase;
})