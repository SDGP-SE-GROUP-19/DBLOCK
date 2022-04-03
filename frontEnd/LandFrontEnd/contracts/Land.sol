// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Land {
    
    // structs
    struct LawyerIdSellerId {

        uint deedIdLink; // to link the relevant deed
        uint oldLawyerId;
        uint oldSellerId;
        string dateStamp;
        string timeStamp;
    }

    struct Deed {
        // deed instance variables
        uint deedId;
        string ipfsHash;
        string no;
        string streetName;
        string city;
        string district;
        string province;
        uint assignedLawyerId; // to link the relevant lawyer to the deed
        uint assignedSellerId; // to link the relevant seller to the deed
    }

    struct Lawyer{
        // Lawyer instance variables
        uint lawyerId;
        string lawyerName;
        string lawyernic;
        string lawyerRegNo;
        string lawyerEmail;
        uint lawyerTelephoneNumber;
    }

    struct Seller {
        // Seller instance variables
        string name;
		uint id;
		string nic;
        uint age;
        string city;
		string email;
        uint telephoneNumber;
    }

    struct Admin {
        // Admin instance variables
        uint id;
        string adminPassword;
    }

    // mappings
    mapping(uint => Deed) public deeds;
    mapping(uint => LawyerIdSellerId) public deedsVersionHistory;
    mapping(uint => Seller) public sellersMapping;
    mapping(uint => Lawyer) public Lawyersmapping;
    mapping(uint => Admin) public adminMapping;
    
    // Count tracking variables
    uint private deedCount = 0;
    uint private deedsVersionHistoryCount = 0;
    uint private sellersCount = 0;
    uint private lawyerCount = 0;
    uint private adminCount = 0;

    constructor() public {
        // initializing the admin
        adminMapping[adminCount] = Admin(adminCount, "123");
        adminCount++;
    }    

    function getHashFromDeed(uint index) public view returns (string memory) {   
        return deeds[index].ipfsHash;
    }

    function sendHash(uint deedId, string memory x) public {
        deeds[deedId].ipfsHash = x;
    }     

    // getter for deed count
    function getDeedCount() public view returns (uint) {
        return deedCount;
    }

    // getter for lawyer count
    function getLawyerCount() public view returns(uint){
        return lawyerCount;
    }

    // getter for seller count
    function getSellersCount() public view returns(uint){
        return sellersCount;
    }

    // getter for admin count
    function getAdminCount() public view returns(uint){
        return adminCount;
    }

    //getters for Deed struct
    function getDeedId(uint index) public view returns (uint) {
        return deeds[index].deedId;
    }

    function getDeedNo(uint index) public view returns (string memory) {
        return deeds[index].no;
    }

    function getDeedStreetName(uint index) public view returns (string memory) {
        return deeds[index].streetName;
    }

    function getDeedCity(uint index) public view returns (string memory) {
        return deeds[index].city;
    }

    function getDeedDistrict(uint index) public view returns (string memory) {
        return deeds[index].district;
    }

    function getDeedProvince(uint index) public view returns (string memory) {
        return deeds[index].province;
    }

    function getLawyerIdOfDeed(uint index) public view returns (uint) {
        return deeds[index].assignedLawyerId;
    }

    function getSellerIdOfDeed(uint index) public view returns (uint) {
        return deeds[index].assignedSellerId;
    }

    // function to compare strings
    function compareStrings(string memory s1, string memory s2) private pure returns (bool) {
        if (keccak256(abi.encodePacked(s1)) == keccak256(abi.encodePacked(s2)))
        {
            return true;
        }
        else 
        {
            return false;
        }
    }

    // function to get the deed by the land address for searching purposes
    function findDeedByAddress(string memory _no, string memory _streetName, string memory _city, string memory _district, string memory _province) public view returns (int) {

        uint i = 0;
        int returningDeedId = -1;

        while (i < deedCount)
        {
            if (compareStrings(_no, deeds[i].no) && compareStrings(_streetName, deeds[i].streetName) && compareStrings(_city, deeds[i].city) && compareStrings(_district, deeds[i].district) && compareStrings(_province, deeds[i].province))
            {
                returningDeedId = int(deeds[i].deedId);
                break;
            }

            i++;
        }

        return returningDeedId;
    }

    // function to get the lawyer by email
    function findLawyerByEmail(string memory _email) public view returns (int) {

        uint i = 0;
        int returningLawyerId = -1;

        while (i < lawyerCount)
        {
            if (compareStrings(_email, Lawyersmapping[i].lawyerEmail))
            {
                returningLawyerId = int(Lawyersmapping[i].lawyerId);
                break;
            }

            i++;
        }

        return returningLawyerId;
    }

    //function to get the seller by email
    function findSellerByEmail(string memory _email) public view returns (int) {

        uint i = 0;
        int returningSellerId = -1;

        while (i < sellersCount)
        {
            if (compareStrings(_email, sellersMapping[i].email))
            {
                returningSellerId = int(sellersMapping[i].id);
                break;
            }

            i++;
        }

        return returningSellerId;
    }

    // function to change land deed buyer and seller
    function changeDeedLawyerAndSeller(uint _deedId, uint _assignedLawyerId, uint _assignedSellerId, string memory _dateStamp, string memory _timeStamp) public {
        // saving the previous lawyer and seller in the history
        uint _oldLawyerId = deeds[_deedId].assignedLawyerId;
        uint _oldSellerId = deeds[_deedId].assignedSellerId;
        deedsVersionHistory[deedsVersionHistoryCount] = LawyerIdSellerId(_deedId, _oldLawyerId, _oldSellerId, _dateStamp, _timeStamp);
        deedsVersionHistoryCount++;

        // assigning the new lawyer and seller
        deeds[_deedId].assignedLawyerId = _assignedLawyerId;
        deeds[_deedId].assignedSellerId = _assignedSellerId;
    }

    // function to add a new deed to the deeds mapping
    function addNewDeed(string memory _no, string memory _streetName, string memory _city, string memory _district, string memory _province, uint _assignedLawyerId, uint _assignedSellerId) public {
        deeds[deedCount] = Deed(deedCount, "<IPFS#>", _no,  _streetName, _city, _district, _province, _assignedLawyerId, _assignedSellerId);
        deedCount++;
    }

    //function to register a seller
    function registerSeller(string memory _name, string memory _nic, uint _age, string memory _city, string memory _email, uint _telephoneNumber) public {
        sellersMapping[sellersCount] = Seller(_name, sellersCount, _nic, _age, _city, _email, _telephoneNumber);
        sellersCount++;
    }

    //function to register a new Lawyer
    function registerLawyer(string memory _lawyerName, string memory _lawyernic, string memory _lawyerRegNo, string memory _lawyerEmail, uint _lawyerTelephoneNumber) public {
        Lawyersmapping[lawyerCount] = Lawyer(lawyerCount, _lawyerName, _lawyernic, _lawyerRegNo, _lawyerEmail, _lawyerTelephoneNumber);
        lawyerCount++;
    }

    // function to get the lawyer id
    function getLawyerId(uint index) public view returns (uint) {
        return Lawyersmapping[index].lawyerId;
    }

    // function to get the lawyer name
    function getLawyerName(uint index) public view returns (string memory) {
        return Lawyersmapping[index].lawyerName;
    }

    // function to get the lawyer nic
    function getLawyerNic(uint index) public view returns (string memory) {
        return Lawyersmapping[index].lawyernic;
    }

    // function to get the lawyer reg no
    function getLawyerRegNo(uint index) public view returns (string memory) {
        return Lawyersmapping[index].lawyerRegNo;
    }

    // function to get the lawyer email
    function getLawyerEmail(uint index) public view returns (string memory) {
        return Lawyersmapping[index].lawyerEmail;
    }

    // function to get the lawyer email
    function getLawyerTelephoneNumber(uint index) public view returns (uint) {
        return Lawyersmapping[index].lawyerTelephoneNumber;
    }

    // function to get the seller id
    function getSellerId(uint index) public view returns (uint) {
        return sellersMapping[index].id;
    }

    // function to get the seller name
    function getSellerName(uint index) public view returns (string memory) {
        return sellersMapping[index].name;
    }

    // function to get the seller nic
    function getSellerNic(uint index) public view returns (string memory) {
        return sellersMapping[index].nic;
    }

    // function to get the seller age
    function getSellerAge(uint index) public view returns (uint) {
        return sellersMapping[index].age;
    }

    // function to get the seller city
    function getSellerCity(uint index) public view returns (string memory) {
        return sellersMapping[index].city;
    }

    // function to get the seller email
    function getSellerEmail(uint index) public view returns (string memory) {
        return sellersMapping[index].email;
    }

    // function to get the seller telephonenumber
    function getSellerTelephoneNo(uint index) public view returns (uint) {
        return sellersMapping[index].telephoneNumber;
    }
    
    //function to get admin id
    function getAdminId() public view returns (uint) {
        return adminMapping[0].id;
    }

    //function to get admin password
    function getAdminPassword() public view returns (string memory) {
        return adminMapping[0].adminPassword;
    }

    // function to get the deedId from the history
    function getDeedIdFromHistory(uint frontendCounter) public view returns (uint) {
        return deedsVersionHistory[frontendCounter].deedIdLink;
    }

    // function to get the lawyerId from the history
    function getOldLawyerIdFromHistory(uint frontendCounter) public view returns (uint) {
        return deedsVersionHistory[frontendCounter].oldLawyerId;
    }

    // function to get the sellerId from the history
    function getOldSellerIdFromHistory(uint frontendCounter) public view returns (uint) {
        return deedsVersionHistory[frontendCounter].oldSellerId;
    }
    
    // function to get the dateStamp from the history
    function getDateStampFromHistory(uint frontendCounter) public view returns (string memory) {
        return deedsVersionHistory[frontendCounter].dateStamp;
    }

    // function to get the timeStamp from the history
    function getTimeStampFromHistory(uint frontendCounter) public view returns (string memory) {
        return deedsVersionHistory[frontendCounter].timeStamp;
    }
}
