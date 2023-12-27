module.exports = (app) => {
    const bills = require("../controller/billController");
    var router = require("express").Router();

    router.route('/').get(bills.getAllBill);
    router.route('/:bid').get(bills.getOneWithBillId).patch(bills.editOneWithBillId).delete(bills.deleteOneWithBillId);

    app.use("/api/v1/bills", router);
}