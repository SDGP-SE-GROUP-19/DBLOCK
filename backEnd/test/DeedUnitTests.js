const Land = artifacts.require("Land");

contract("Land", account => {

    let instance;

    beforeEach("should setup the contract instance", async () => {

        instance = await Land.deployed();
        await instance.addNewDeed("20", "Temple Lane", "Kolpity", "Colombo", "West", 0, 0);
        await instance.registerLawyer("Sarath", "570511041v", "20200187", "sarath@gmail.com", 0771234567, "Sarath@1234");
        await instance.registerSeller("Chris", "278987876v", "26","Kandy", "chris@gmail.com", 0761421615, "Chris@1234");
    });

    //Unit test for admin id
    it("should return the admin id as 0", async () => {

        const adminId = await instance.getAdminId();

        assert.equal(adminId, 0);
    });

    //Unit test for admin password
    it("should return the admin password as 123", async () => {

        const adminPassword = await instance.getAdminPassword();

        assert.equal(adminPassword, "123");
    });

    //Unit test for deed id
    it("Getting the deed id after add a deed", async () => {

        const deedId = await instance.getDeedId(0);

        assert.equal(deedId, 0);
    });

    //Unit test for deed no
    it("Getting the deed no after add a deed", async () => {

        const deedNo = await instance.getDeedNo(0);

        assert.equal(deedNo, "20");
    });

    //Unit test for deed street name
    it("Getting the deed street name after adding a deed", async () => {

        const deedStreetName = await instance.getDeedStreetName(0);

        assert.equal(deedStreetName, "Temple Lane");
    });

    //Unit test for deed city
    it("Getting the deed city after add a deed", async () => {

        const deedCity = await instance.getDeedCity(0);

        assert.equal(deedCity, "Kolpity");
    });

    //Unit test for deed district
    it("Getting the deed district after add a deed", async () => {

        const deedDistrict = await instance.getDeedDistrict(0);

        assert.equal(deedDistrict, "Colombo");
    });
    
    //Unit test for deed province
    it("Getting the deed province after add a deed", async () => {

        const deedProvince = await instance.getDeedProvince(0);

        assert.equal(deedProvince, "West");
    });

    //Unit test for deed lawyer id
    it("Getting the deed lawyer id of the deed after add a deed", async () => {

        const lawyerIdOfDeed = await instance.getLawyerIdOfDeed(0);

        assert.equal(lawyerIdOfDeed, 0);
    });

    //Unit test for deed seller id
    it("Getting the deed seller id of the deed after add a deed", async () => {

        const sellerIdOfDeed = await instance.getSellerIdOfDeed(0);

        assert.equal(sellerIdOfDeed, 0);
    });

    //Unit testing part of Lawyer ID
    it("Getting the lawyer id after registering a lawyer", async () => {

        const LawyerId = await instance.getLawyerId(0);

        assert.equal(LawyerId, 0);
    });

    //Unit testing part of Lawyer Name
    it("Getting the lawyer name after registering a lawyer", async () => {

        const LawyerName = await instance.getLawyerName(0);

        assert.equal(LawyerName, "Sarath");
    });

    //Unit testing part of Lawyer NIC
    it("Getting the lawyer NIC no after registering a lawyer", async () => {

        const LawyerNic = await instance.getLawyerNic(0);

        assert.equal(LawyerNic, "570511041v");
    });

    //Unit testing part of Lawyer registration number
    it("Getting the lawyer registration no after registering a lawyer", async () => {

        const LawyerRegNo = await instance.getLawyerRegNo(0);

        assert.equal(LawyerRegNo, "20200187");
    });

    //Unit testing part of Lawyer email address
    it("Getting the lawyer email address after register a lawyer", async () => {

        const lawyerEmail = await instance.getLawyerEmail(0);

        assert.equal(lawyerEmail, "sarath@gmail.com");
    });

    //Unit testing part of Lawyer telephone number
    it("Getting the lawyer telephone no after registering a lawyer", async () => {

        const LawyerTelephoneNumber = await instance.getLawyerTelephoneNumber(0);

        assert.equal(LawyerTelephoneNumber, 0771234567);
    });

    //Unit testing part of Lawyer Password
    it("Getting the lawyer password after registering a lawyer", async () => {

        const LawyerPassword = await instance.getLawyerPassword(0);

        assert.equal(LawyerPassword, "Sarath@1234");
    });

    //unit testing part of seller name
    it("Getting the seller name after registering a seller", async () => {
        const SellerName = await instance.getSellerName(0);

        assert.equal(SellerName, "Chris");
    });
     
    //unit testing part of the seller nic
    it("Getting the seller nic after registering a seller", async () => {
        const SellerNic = await instance.getSellerNic(0);

        assert.equal(SellerNic, "278987876v");
    });

    //unit testing part of the seller age
    it("Getting the seller age after registering a seller", async () => {
        const SellerAge = await instance.getSellerAge(0);

        assert.equal(SellerAge, "26");
    });

    //unit testing part of the seller city
    it("Getting the seller city after registering a seller", async () => {
        const SellerCity = await instance.getSellerCity(0);

        assert.equal(SellerCity, "Kandy");
    });

    //unit testing part of the seller email
    it("Getting the seller email after registering a seller", async () => {
        const SellerEmail = await instance.getSellerEmail(0);

        assert.equal(SellerEmail, "chris@gmail.com");
    });

    //unit testing part of the seller telNo
    it("Getting the seller telephone number after registering a telno", async () => {
        const SellerTelNo= await instance.getSellerTelephoneNo(0);

        assert.equal(SellerTelNo, 0761421615);
    });

    //unit testing part of the seller id
    it("Getting the seller id after registering a id", async () => {
        const SellerId= await instance.getSellerId(0);

        assert.equal(SellerId, 0);
    });

    // unit test to change the current lawyer and seller
    it("should change the lawyer for a deed", async () => {

        await instance.changeDeedLawyerAndSeller(0, 1, 0, "03/04/2022", "08:53");
        const lawyerIdOfDeed = await instance.getLawyerIdOfDeed(0);

        assert.equal(lawyerIdOfDeed, 1);
    });

    // unit test to change the current lawyer and seller
    it("should change the seller for a deed", async () => {

        await instance.changeDeedLawyerAndSeller(0, 1, 1, "04/04/2022", "09:00");
        const sellerIdOfDeed = await instance.getSellerIdOfDeed(0);

        assert.equal(sellerIdOfDeed, 1);
    });

    // unit test to get the old lawyer ID from the history
    it("should get the old lawyer id from history", async () => {

        const oldLawyerId = await instance.getOldLawyerIdFromHistory(0);

        assert.equal(oldLawyerId, 0);
    });

    // unit test to get the old seller ID from the history
    it("should get the old seller id from history", async () => {

        const oldsellerId = await instance.getOldSellerIdFromHistory(0);

        assert.equal(oldsellerId, 0);
    });

    // unit test to get the date for deedId=0 and counter=0 from the history
    it("should get the date for from history", async () => {

        const date = await instance.getDateStampFromHistory(0);

        assert.equal(date, "03/04/2022");
    });

    // unit test to get the time for deedId=0 and counter=0 from the history
    it("should get the time from history", async () => {

        const time = await instance.getTimeStampFromHistory(0);

        assert.equal(time, "08:53");
    });

    // unit test to get the count of the history
    it("should get the count of history", async () => {

        const count = await instance.getHistoryCount();

        assert.equal(count, 2);
    });
});
