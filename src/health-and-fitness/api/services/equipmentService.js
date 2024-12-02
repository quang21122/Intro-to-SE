import { firestoreDb } from '../firebase.js';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where } from 'firebase/firestore';

const createEquipment = async (data) => {
    const { image, name } = data;
    console.log(data);

    // Helper function to generate a random alphanumeric string
    const generateId = (length) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    try {
        const query = await getDoc(doc(firestoreDb, 'equipments', name));
        if (query.exists()) {
            return { error: "Equipment already exists", status: 400 };
        }

        // Get length of equipment collection
        const equipmentCollection = await getDocs(collection(firestoreDb, 'equipments'));
        console.log(equipmentCollection.size);

        // Create a new equipment ID like this Mh5XnJePUHF4EV8S9o1F
        const equipmentId = generateId(20);
        console.log("equipment id: ",equipmentId)
        // Prepare the equipment data
        const equipmentData = {
            name,
            createdAt: new Date(),
        };

        if (image) {
            equipmentData.image = image;
        }

        // Store additional equipment data in Firestore
        await setDoc(doc(firestoreDb, 'equipments', equipmentId), equipmentData);

        return { description: "Equipment created successfully", image, name };
    } catch (error) {
        console.error("Error creating equipment:", error);
        return { error: error.message, status: 500 };
    }
};

const getEquipment = async (id) => {
    try {
        // Query Firestore to find the document by name
        const equipmentDoc = await getDoc(doc(firestoreDb, 'equipments', id));
        if (!equipmentDoc.exists()) {
            return { error: "Equipment not found", status: 404 };
        }
        return { user: equipmentDoc.data(), status: 200 };

    } catch (error) {
        console.error("Error getting equipment by id:", error);
        return { error: error.message, status: 500 };
    }
}

const updateEquipment = async (id, data) => {
    try {
        // Query Firestore to find the document by name
        const equipmentDoc = await getDoc(doc(firestoreDb, 'equipments', id));
        if (!equipmentDoc.exists()) {
            return { error: "Equipment not found", status: 404 };
        }

        await updateDoc(doc(firestoreDb, 'equipments', equipmentDoc.id), data);
        return { id: equipmentDoc.id, ...data };
    } catch (error) {
        console.error("Error updating equipment by id:", error);
        return { error: error.message, status: 500 };
    }
};

const deleteEquipment = async (id) => {
    try {
        // Query Firestore to find the document by name
        const equipmentDoc = await getDoc(doc(firestoreDb, 'equipments', id));
        if (!equipmentDoc.exists()) {
            return { error: "Equipment not found", status: 404 };
        }
        
        await deleteDoc(doc(firestoreDb, 'equipments', equipmentDoc.id));
        return { id: equipmentDoc.id, ...equipmentDoc.data() };
    } catch (error) {
        console.error("Error deleting equipment by id:", error);
        return { error: error.message, status: 500 };
    }
};
export default { createEquipment, getEquipment, updateEquipment, deleteEquipment };