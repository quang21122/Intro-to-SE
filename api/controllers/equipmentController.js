import equipmentService from '../services/equipmentService.js'; // Adjust path if needed

const getEquipment = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: "Equipment id is required" });
    }

    const equipment = await equipmentService.getEquipment(id);

    if (equipment.error) {
        return res.status(equipment.status).json({ error: equipment.error });
    }

    res.status(200).json(equipment);
};

const createEquipment = async (req, res) => {
    const newEquipment = await equipmentService.createEquipment(req.body);
    
    if (newEquipment.error) {
        return res.status(newEquipment.status).json({ error: newEquipment.error });
    }
    
    res.status(201).json(newEquipment);
};

const updateEquipment = async (req, res) => {
    const { id } = req.query;
    const { body } = req;

    if (!id) {
        return res.status(400).json({ error: "id is required" });
    }

    const updatedEquipment = await equipmentService.updateEquipment(id, body);
    
    if (updatedEquipment.error) {
        return res.status(updatedEquipment.status).json({ error: updatedEquipment.error });
    }

    res.status(200).json(updatedEquipment);
};

const deleteEquipment = async (req, res) => {
    const { id } = req.query;
    const deletedEquipment = await equipmentService.deleteEquipment(id);
    
    if (deletedEquipment.error) {
        return res.status(deletedEquipment.status).json({ error: deletedEquipment.error });
    }
    
    res.status(200).json(deletedEquipment);
}

const getAllEquipments = async (req, res) => {
    const equipments = await equipmentService.getAllEquipments();
    
    if (equipments.error) {
        return res.status(equipments.status).json({ error: equipments.error });
    }
    
    res.status(200).json(equipments);
}

export default { getEquipment, createEquipment, updateEquipment, deleteEquipment, getAllEquipments };