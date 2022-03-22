const Land = artifacts.require("Land");

contract("Land", account => {

    let instance;

    beforeEach("should setup the contract instance", async () => {

        instance = await Land.deployed();
    });

    it("should return the admin id as 0", async () => {

        const adminId = await instance.getAdminId();

        assert.equal(adminId, 0);
    });

    it("should return the admin password as 123", async () => {

        const adminPassword = await instance.getAdminPassword();

        assert.equal(adminPassword, "123");
    });
});
