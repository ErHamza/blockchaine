//SPDX-License-Identifier: MIT 

pragma solidity ^0.8.19;

contract VerifyDataIntegrity {

    address public admin;

    // Le constructeur est appelé une seule fois à la déploiement du contrat
    constructor() {
        // Le créateur du contrat (celui qui le déploie) devient l'administrateur
        admin = msg.sender;
    } 

    // Fonction interne pour calculer le hash d'une chaîne de caractères
    function hash(string memory content) internal pure returns (bytes32) {
        bytes32 contentHash = keccak256(bytes(content));
        return contentHash;
    } 

    // Fonction pour mettre à jour le hash d'un fichier
    function updateFileHash(string memory _url, string memory _content) public {
        // Seul l'administrateur peut créer ou mettre à jour le hash d'un fichier
        require(msg.sender == admin, "you don't have access to update the files hashes");
        FileHash[_url] = hash(_content);
    }

    // Fonction pour vérifier l'intégrité du contenu d'un fichier
    function checkDataIntegrity(string memory _url, string memory _newContent) public view returns (string memory) {
        string memory message;

        // Vérifier si le hash associé à l'URL existe (non nul)
        if (FileHash[_url] == bytes32(0)) {
            message = "This URL is invalid, check the uploaded file and try again";
            return message;
        }

        bytes32 currentHash = FileHash[_url];
        bytes32 newHash = hash(_newContent);

        // Comparer les hashs pour déterminer si le contenu a été modifié
        if (currentHash == newHash) {
            message = "content isn't modified!";
            return message;
        } else {
            message = "Content has been modified !";
            return message;
        }
    }

    // Le mapping pour stocker et extraire les hashs des fichiers en fonction de leurs URLs
    mapping (string => bytes32) internal FileHash;

}
