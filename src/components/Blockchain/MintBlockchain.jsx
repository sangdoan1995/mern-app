import { ethers } from 'ethers';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./MintBlockchain.css";

// const web3 = new Web3('http://127.0.0.1:8545'); // Use Ganache RPC server address
// const MyContract = [{
//     "inputs": [
//         {
//             "internalType": "string",
//             "name": "tokenURI",
//             "type": "string"
//         }
//     ],
//     "name": "mintNFT",
//     "outputs": [
//         {
//             "internalType": "uint256",
//             "name": "",
//             "type": "uint256"
//         }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
// }];
const MyContract = require("../../build/abi.json")

const Mintblockchain = () => {
    const [mint, Setmint] = useState();
    const [info, Setinfo] = useState({
        uri: '',
        description: '',
        address: ''
    })
    // const [uri, Seturi] = useState();
    // const [address, Setaddress] = useState();
    const contractAddress = info.address; // Replace with your deployed contract address

    const MintNFT = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum); // Use Ganache RPC server address
        const signer = await provider.getSigner();
        // const privateKey = 'e6a80e762cd63886bb3886c0e2026c694087cec98700aa398ba72b0cf62fb58b'; // Replace with your private key
        // const wallet = new ethers.Wallet(privateKey, provider);

        const mycontract = await new ethers.Contract(contractAddress, MyContract, signer);

        try {

            toast.success("Loading wallet", { position: toast.POSITION.TOP_RIGHT })
            const data = await mycontract.mintNFT(info.uri, info.description);
            await data.wait();
            // Setmint(data)
            toast.success("Mint data success", { position: toast.POSITION.TOP_RIGHT })
            Setmint(data.hash)
            console.log(data)
            Setinfo({
                uri: ' ',
                description: ' '
            })

        } catch (err) {
            toast.error("Minted fail", { position: toast.POSITION.TOP_RIGHT })
            console.log(err)
        }

    }


    return (
        <div className='Home-block'>
            <div className='Home-block-container'>

                <div className='Home-title'>Mint NFT to Blockchain</div>
                <textarea className="content" id="" placeholder='Nhập đường dẫn lưu file' cols="30" rows="10"
                    required
                    value={info.uri}
                    onChange={e => Setinfo({ ...info, uri: e.target.value })}
                />
                <ToastContainer />
                <input type="text" className='Home-input' placeholder='Mô tả' required value={info.description} onChange={e => Setinfo({ ...info, description: e.target.value })} />
                <input type="text" className='Home-input' placeholder='Địa chỉ ví' required value={info.address} onChange={e => Setinfo({ ...info, address: e.target.value })} />
                <button className='Home-click' onClick={MintNFT}>Mint NFT</button>


                <textarea className='Home-result' value={"Mã giao dịch :" + mint} />
            </div>



        </div>
    )
}
export default Mintblockchain;