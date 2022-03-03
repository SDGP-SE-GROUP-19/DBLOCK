// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Land {
    // structs
    struct Deed {
        // deed instance variables
        uint deedId;
        string no;
        string streetName;
        string city;
        string district;
        string province;
        uint assignedLawyerId; // to link the relevant lawyer to the deed
        uint assignedSellerId; // to link the relevant seller to the deed
    }

    struct Buyer{
        // Buyer instance variables
       uint id;
       string nic;
       string name;
       uint age;
       string city;
       string email; 
       uint telephoneNumber;
    }

    struct Lawyer{
        // Lawyer instance variables
        uint lawyerId;
        string lawyerName;
        string lawyernic;
        string lawyerRegNo;
        string lawyerEmail;
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
    }

    // mappings
    mapping(uint => Deed) public deeds;
    mapping(uint => Buyer) public Buyersmapping;
    mapping(uint => Seller) public sellersMapping;
    mapping(uint => Lawyer) public Lawyersmapping;
    mapping(uint => Admin) public adminMapping;
    
    //arrays
    address[] public Buyerlist;
    address[] public sellerList;
    address[] public lawyerList;

    // Count tracking variables
    uint private deedCount = 0;
    uint private buyersCount = 0;
    uint private sellersCount = 0;
    uint private lawyerCount=0;
    uint private adminCount = 0;

    // getter for deed count
    function getDeedCount() public view returns (uint) {
        return deedCount;
    }

    // getter for buyer count
    function getBuyersCount() public view returns(uint){
        return buyersCount;
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
    function findDeedByAddress(string memory _no, string memory _streetName, string memory _city, string memory _district, string memory _province) public view returns (uint) {
        uint i = 0;
        uint returningDeedId;
        while (i < deedCount)
        {
            if (compareStrings(_no, deeds[i].no) && compareStrings(_streetName, deeds[i].streetName) && compareStrings(_city, deeds[i].city) && compareStrings(_district, deeds[i].district) && compareStrings(_province, deeds[i].province))
            {
                returningDeedId = deeds[i].deedId;
                break;
            }
            i++;
        }
        return returningDeedId;
    }

    // function to change land deed buyer and seller
    function changeDeedBuyerAndSeller(uint _deedId, uint _assignedLawyerId, uint _assignedSellerId) public {
        
        deeds[_deedId].assignedLawyerId = _assignedLawyerId;
        deeds[_deedId].assignedSellerId = _assignedSellerId;
    }

    //getter for the Buyerlist array
    function getBuyer() public view returns( address [] memory){
        return(Buyerlist);
    }

    //getter for the seller list array
    function getSeller() public view returns( address [] memory){
        return(sellerList);
    }

    //getter for the lawyerList array
    function getLawyer() public view returns( address [] memory){
        return(lawyerList);
    }

    // function to add a new deed to the deeds mapping
    function addNewDeed(string memory _no, string memory _streetName, string memory _city, string memory _district, string memory _province, uint _assignedLawyerId, uint _assignedSellerId) public {
        deeds[deedCount] = Deed(deedCount, _no, _streetName, _city, _district, _province, _assignedLawyerId, _assignedSellerId);
        deedCount++;
    }

    //function to register new Buyer
    function registerBuyer(uint _id, string memory _nic, string memory _name, uint _age, string memory _city, string memory _email, uint _telephoneNumber) public {
        Buyersmapping[buyersCount] = Buyer(_id, _nic,  _name, _age, _city, _email, _telephoneNumber);
        buyersCount++;

    }

    //function to register a seller
    function registerSeller(string memory _name, uint _id, string memory _nic, uint _age, string memory _city, string memory _email, uint _telephoneNumber) public {
        sellersMapping[sellersCount] = Seller(_name, _id, _nic, _age, _city, _email, _telephoneNumber);
        sellersCount++;

    }

    //function to register a new Lawyer
    function registerLawyer(uint _lawyerId, string memory _lawyerName, string memory _lawyernic, string memory _lawyerRegNo, string memory _lawyerEmail) public {
        Lawyersmapping[lawyerCount] = Lawyer(_lawyerId, _lawyerName, _lawyernic, _lawyerRegNo, _lawyerEmail);
        lawyerCount++;
    }

    //function to display buyer details
    function displayBuyer(uint index) public view returns (uint _id, string memory _nic, string memory _name, uint _age, string memory _city, string memory _email, uint _telephoneNumber){
        return(Buyersmapping[index].id, Buyersmapping[index].nic,Buyersmapping[index].name,Buyersmapping[index].age,Buyersmapping[index].city,Buyersmapping[index].email,Buyersmapping[index].telephoneNumber);

    } 

    //function to display seller details
    function displaySeller(uint index) public view returns (string memory _name, uint _id, string memory _nic, uint _age, string memory _city, string memory _email, uint _telephoneNumber){
        return(sellersMapping[index].name, sellersMapping[index].id, sellersMapping[index].nic, sellersMapping[index].age, sellersMapping[index].city, sellersMapping[index].email, sellersMapping[index].telephoneNumber);
    }

    //function to add admin
    function addAdmin() private {
        adminCount++;
        adminMapping[adminCount] = Admin(adminCount);
    }
    
    //function to display lawyer details
    function displayLawyer(uint index) public view returns (uint _lawyerId, string memory _lawyerName, string memory _lawyernic, string memory _lawyerRegNo, string memory _lawyerEmail){
        return(Lawyersmapping[index].lawyerId, Lawyersmapping[index].lawyerName, Lawyersmapping[index].lawyernic, Lawyersmapping[index].lawyerRegNo, Lawyersmapping[index].lawyerEmail);
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
}
