// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeSearch {
    address public admin;
    
    enum ProposalStatus { Pending, Verified, Rejected }

    struct Proposal {
        address researcher;
        string leadResearcher;
        string projectTitle;
        string projectDetails;
        uint256 fundRequired;
        uint256 votes;
        ProposalStatus status;
    }

    Proposal[] public proposals;
    mapping(address => bool) public hasVoted;

    event ProposalSubmitted(uint256 indexed proposalId, address indexed researcher);
    event ProposalVoted(uint256 indexed proposalId, address indexed voter);
    event ProposalVerified(uint256 indexed proposalId);
    event DonationReceived(address indexed donor, uint256 indexed proposalId, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyPendingProposal(uint256 _proposalId) {
        require(proposals[_proposalId].status == ProposalStatus.Pending, "Proposal is not pending");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function submitProposal(string memory _leadResearcher,string memory _projectTitle,string memory _projectDetails,uint256 _fundRequired) external {
        require(_fundRequired > 0, "Fund required must be greater than 0");

        proposals.push(Proposal({
            researcher: msg.sender,
            leadResearcher: _leadResearcher,
            projectTitle: _projectTitle,
            projectDetails: _projectDetails,
            fundRequired: _fundRequired,
            votes: 0,
            status: ProposalStatus.Pending
        }));

        emit ProposalSubmitted(proposals.length - 1, msg.sender);
    }

    function voteForProposal(uint256 _proposalId) external {
        require(!hasVoted[msg.sender], "Already voted");
        require(_proposalId < proposals.length, "Invalid proposal ID");
        require(proposals[_proposalId].status == ProposalStatus.Pending, "Proposal is not pending");

        proposals[_proposalId].votes += 1;
        hasVoted[msg.sender] = true;

        emit ProposalVoted(_proposalId, msg.sender);
    }

    function verifyProposal(uint256 _proposalId) external onlyAdmin onlyPendingProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        require(proposal.votes > 0, "No votes for the proposal");

        proposal.status = ProposalStatus.Verified;

        emit ProposalVerified(_proposalId);
    }

    function donateToProject(uint256 _proposalId) external payable {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        require(proposals[_proposalId].status == ProposalStatus.Verified, "Proposal is not verified");

        address researcher = proposals[_proposalId].researcher;
        payable(researcher).transfer(msg.value);

        emit DonationReceived(msg.sender, _proposalId, msg.value);
    }

    function getProposalsCount() external view returns (uint256) {
        return proposals.length;
    }

    function getProposalDetails(uint256 _proposalId) external view returns (address, string memory,string memory,string memory,uint256, uint256, ProposalStatus) {
        require(_proposalId < proposals.length, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        return (proposal.researcher,proposal.leadResearcher,proposal.projectTitle, proposal.projectDetails, proposal.fundRequired, proposal.votes, proposal.status);
    }
}