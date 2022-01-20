var Web3 = require('web3');
var provider = 'http://localhost:8080/';
var web3Provider = new Web3.providers.HttpProvider(provider);
var web3 = new Web3(web3Provider);
web3.eth.getBlockNumber().then((result) => {
  console.log("Latest Ethereum Block is ",result);
});
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
			UserAddress=web3.eth.coinbase;
        } catch (error) {
            alert("User denied account access...");
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
		UserAddress=web3.eth.coinbase;
    }
    else {
        alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

function AddUser()
{
	var ABIString = document.getElementById("hdnContractABI").value; 
	ABIString = ABIString.replace(/'/g , "\"");
	ABIJSON = JSON.parse(ABIString);
	MyContract = web3.eth.contract(ABIJSON).at("<%=ContractAddress%>");

	var FullName = document.getElementById("txtFullName").value; 
	var EmailID = document.getElementById("txtEmailID").value; 
	var MobileNo = document.getElementById("txtMobileNo").value; 
	
	MyContract.AddUser.sendTransaction(UserAddress,FullName,EmailID,MobileNo,function(err, transactionHash) {
		if(!err)
		{
			location.href="/Message?TransHash="+transactionHash
		}
		else
		{
			console.log(err)
		}
	});

}
