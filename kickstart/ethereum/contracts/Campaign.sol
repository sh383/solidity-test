//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0;

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    function createCampaign(uint256 minimum) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;         // Describes why the request is being created
        uint256 value;              // Amounts of money that the manager wants to send to the vendor
        address payable recipient;  // Address that money will be sent to
        bool complete;              // True if the request has already been processed
        uint256 approvalCount;
        mapping (address => bool) approvals;
    }

    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;
    // Request[] public requests;
    mapping(uint=> Request) public requestsMapping;
    uint private currentIndex;
    

    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }
    // Contract 에 돈을 보내는 경우 항상 payable
    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "A minumum contribution is required."
        );
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    )  public onlyManager {
        Request storage newRequest = requestsMapping[currentIndex];
        newRequest.description= description;
        newRequest.value= value;
        newRequest.recipient= recipient;
        newRequest.complete= false;
        newRequest.approvalCount= 0;
        currentIndex++;
    }

    function approveRequest(uint256 index) public {
        Request storage request = requestsMapping[index];
        require(
            approvers[msg.sender],
            "Only contributors can approve a specific payment request"
        );
        require(
            !request.approvals[msg.sender], // request 마다 approvals mapping 이 존재하고 그 안에서 msg.sender 를 체크 
            "You have already voted to approve this request"
        );

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public onlyManager {
        Request storage request = requestsMapping[index];
        require(
            request.approvalCount > (approversCount / 2),
            "This request needs more approvals before it can be finalized"
        );
        require(!(request.complete), "This request has already been finalized");

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Only the campaign manager can call this function."
        );
        _;
    }
}
