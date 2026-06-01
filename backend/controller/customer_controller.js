import Customer from "../models/customers.js";

export const createCustomer = async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();

    res.status(201).json({
      message: "Customer added successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCustomers = async (_req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.json(customer);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.json({
      message: "Customer updated",
      customer,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.json({
      message: "Customer deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
