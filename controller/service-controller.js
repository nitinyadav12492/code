
import Service from "../models/service-model.js";



const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services || services.length === 0) {
      return res.status(404).json({
        message: "No services found",
      });
    }

    return res.status(200).json(services);

  } catch (error) {
    console.log("Get Services Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};




const createService = async (req, res) => {
  try {
    const {
      service,
      description,
      price,
      provider,
    } = req.body;

    if (!service || !description || !price || !provider) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newService = await Service.create({
      service,
      description,
      price,
      provider,
    });

    return res.status(201).json({
      message: "Service created successfully",
      service: newService,
    });

  } catch (error) {
    console.log("Create Service Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};



const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        service: req.body.service,
        description: req.body.description,
        price: req.body.price,
        provider: req.body.provider,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });

  } catch (error) {
    console.log("Update Service Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};




const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({
        message: "Service not found",
      });
    }

    return res.status(200).json({
      message: "Service deleted successfully",
    });

  } catch (error) {
    console.log("Delete Service Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


export {
  getAllServices,
  createService,
  updateService,
  deleteService,
};