const Land = artifacts.require("Land");

contract("Land", account => {

    let instance;

    beforeEach("should setup the contract instance", async () => {

        instance = await Land.deployed();
        await instance.addNewDeed("20", "Temple Lane", "Kolpity", "Colombo", "West", 0, 0);
    });

    it("should return the admin id as 0", async () => {

        const adminId = await instance.getAdminId();

        assert.equal(adminId, 0);
    });

    it("should return the admin password as 123", async () => {

        const adminPassword = await instance.getAdminPassword();

        assert.equal(adminPassword, "123");
    });

    it("Getting the deed street name after adding a deed", async () => {

        

        const deedStreetName = await instance.getDeedStreetName(0);

        assert.equal(deedStreetName, "Temple Lane");
    });

    it("Getting the lawyer email address after register a lawyer", async () => {

        await instance.registerLawyer("Sarath", "570511041v", "20200187", "sarath@gmail.com", "0771234567");

        const lawyerEmail = await instance.getLawyerEmail(0);

        assert.equal(lawyerEmail, "sarath@gmail.com");
    });

    it("Getting the deed id after add a deed", async () => {

        const deedId = await instance.getDeedId(0);

        assert.equal(deedId, 0);
    });

    it("Getting the deed no after add a deed", async () => {

        const deedNo = await instance.getDeedNo(0);

        assert.equal(deedNo, "20");
    });

    it("Getting the deed city after add a deed", async () => {

        const deedCity = await instance.getDeedCity(0);

        assert.equal(deedCity, "Kolpity");
    });

    it("Getting the deed district after add a deed", async () => {

        const deedDistrict = await instance.getDeedDistrict(0);

        assert.equal(deedDistrict, "Colombo");
    });
    
});
