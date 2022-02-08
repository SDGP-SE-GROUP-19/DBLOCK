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

    // mappings
    mapping(uint => Deed) public deeds;

    // Count tracking variables
    uint private deedCount = 0;

    // getter for deed count
    function getDeedCount() public view returns (uint) {
        return deedCount;
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

    // function to add a new deed to the deeds mapping
    function addNewDeed(string memory _no, string memory _streetName, string memory _city, string memory _district,string memory _province) public {
        deeds[deedCount] = Deed(deedCount, _no, _streetName, _city, _district, _province);
        deedCount++;
    }
}
