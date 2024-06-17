const express = require("express");
const router = express.Router();

let branches = require("../data/branches");
let users = require("../data/users");
let purchases = require("../data/purchases");


router.post("/getBranchesByUserId", (req, res) => {
    const { userId } = req.body;
    const user = users.find((u) => u.id === userId);

    if (!Array.isArray(user.branchId)) {
        return res.status(400).json({ error: "branchIds should be an array" });
    }

    const requestedBranches = branches.filter((branch) =>
        user.branchId.includes(branch.id)
    );

    res.json(requestedBranches);
});


router.post("/fetchUpdatedBranch", (req, res) => {
    const { updatedBranch, editor } = req.body;

    const updatedBranchIndex = branches.findIndex(
        (branch) => branch.id === updatedBranch.id
    );
    if (updatedBranchIndex !== -1) {
        branches[updatedBranchIndex] = updatedBranch;
    } else {
        return res.status(404).json({ error: "Branch not found" });
    }

    if (!Array.isArray(editor.branchId)) {
        return res.status(400).json({ error: "branchIds should be an array" });
    }

    const user = users.find((u) => u.id === editor.id);
    const requestedBranches = branches.filter((branch) =>
        user.branchId.includes(branch.id)
    );

    res.json(requestedBranches);
});




router.post("/fetchAddBranch", (req, res) => {
    const { newBranch, editor } = req.body;

    const generateUniqueId = () => {
        let id;
        let isUnique = false;
        while (!isUnique) {
            id = '';
            for (let i = 0; i < 8; i++) {
                id += Math.floor(Math.random() * 10).toString();
            }
            isUnique = !branches.some((branch) => branch.id === id);
        }
        return id;
    };

    newBranch.id = generateUniqueId();

  
    branches.push(newBranch);//OK
//all good to that point

    const updateUserBranches = () => {
        users = users.map(user => {
            if (user.role.includes('administrator') && !user.branchId.includes(newBranch.id)) {
                return {
                    ...user,
                    branchId: [...user.branchId, newBranch.id]
                };
            }
            return user;
        });
    };

    updateUserBranches();


    // Проверяем существование и массивность branchId у editor
    if (!editor || !Array.isArray(editor.branchId)) {
        return res.status(400).json({ error: "branchIds should be an array" });
    }

    const user = users.find((u) => u.id === editor.id);
    const requestedBranches = branches.filter((branch) =>
        user.branchId.includes(branch.id)
    );

    // res.json(requestedBranches);
    res.json(requestedBranches);

});


module.exports = router;
