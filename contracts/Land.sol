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
    }
    struct Buyer{
        // Buyer instance variables
       uint id;
       string nic;
       string name;
       uint age;
       string city;
       string email; 
    }

    struct Seller {
        // Seller instance variables
        string name;
		uint id;
		string nic;
        uint age;
        string city;
		string email;
    }

    // mappings
    mapping(uint => Deed) public deeds;
    mapping(uint => Buyer) public Buyersmapping;
    mapping(uint => Seller) public sellersMapping;
    
    //arrays
    address[] public Buyerlist;
    address[] public sellerList;

    // Count tracking variables
    uint private deedCount = 0;
    uint private buyersCount=0;
    uint private sellersCount = 0;

    // getter for deed count
    function getDeedCount() public view returns (uint) {
        return deedCount;
    }
    // getter for buyer count
    function getBuyersCount() public view returns(uint){
        return buyersCount;
    }

    // getter for seller count
    function getSellersCount() public view returns(uint){
        return sellersCount;
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
    //getter for the Buyerlist array
    function getBuyer() public view returns( address [] memory){
        return(Buyerlist);
    }

    //getter for the seller list array
    function getSeller() public view returns( address [] memory){
        return(sellerList);
    }

    // function to add a new deed to the deeds mapping
    function addNewDeed(string memory _no, string memory _streetName, string memory _city, string memory _district,string memory _province) public {
        deeds[deedCount] = Deed(deedCount, _no, _streetName, _city, _district, _province);
        deedCount++;
    }

    //function to register new Buyer
    function registerBuyer(uint _id, string memory _nic, string memory _name, uint _age, string memory _city, string memory _email) public {
        
        Buyersmapping[buyersCount] = Buyer(_id, _nic,  _name, _age, _city, _email);
        buyersCount++;

    }

    //function to register a seller
    function registerSeller(string memory _name, uint _id, string memory _nic, uint _age, string memory _city, string memory _email) public {
        sellersMapping[sellersCount] = Seller(_name, _id, _nic, _age, _city, _email);
        sellersCount++;

    }

    //function to display buyer details
    function displayBuyer(uint index) public view returns (uint _id, string memory _nic, string memory _name, uint _age, string memory _city, string memory _email){
        return(Buyersmapping[index].id, Buyersmapping[index].nic,Buyersmapping[index].name,Buyersmapping[index].age,Buyersmapping[index].city,Buyersmapping[index].email);

    } 

    //function to display seller details
    function displaySeller(uint index) public view returns (string memory _name, uint _id, string memory _nic, uint _age, string memory _city, string memory _email){
        return(sellersMapping[index].name, sellersMapping[index].id, sellersMapping[index].nic, sellersMapping[index].age, sellersMapping[index].city, sellersMapping[index].email);
    }
    
}
