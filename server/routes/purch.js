const express = require('express');
const router = express.Router();

// Импортируем массив филиалов
let branches = require('../data/branches');
let users = require('../data/users');
let purchases = require('../data/purchases');


//Маршрут для добавления новой покупки
router.post('/fetchFuelSell', (req, res) => {
    const purchase = req.body;
    purchases.push(purchase);

    const { donorId } = purchase;

    const donorBranchIndex = branches.findIndex(branch => branch.id === donorId);


    if (donorBranchIndex !== -1) {

        const branch = branches[donorBranchIndex];

        if (!branch.branchPurchases) {
            branch.branchPurchases = [];
        }
        branch.branchPurchases.push(purchase);
        //donor

        switch (purchase.fuel) {
            case 'a95':
                branch.currentVolumeA95 -= purchase.liters
                break;
            case 'a100':
                branch.currentVolumeA100 -= purchase.liters
                break;
            case 'diesel':
                branch.currentVolumeDiesel -= purchase.liters
                break;
            default:
                break;
        }

        branches[donorBranchIndex] = branch;

        const user = users.find(u => u.id === purchase.employeeId);
        const userBranches = branches.filter(branch => user.branchId.includes(branch.id));

        res.status(201).json(userBranches);
    } else {
        res.status(404).json({ message: 'Branch not found' });
    }
});


router.post('/fetchFuelTransfer', (req, res) => {
    const purchase = req.body;
    purchases.push(purchase);

    const { donorId } = purchase;
    const { recipientId } = purchase;
    const { employeeId } = purchase;
    

    const donorBranchIndex = branches.findIndex(branch => branch.id === donorId);
    const recipientBranchIndex = branches.findIndex(branch => branch.id === recipientId);


    if (donorBranchIndex !== -1 && recipientBranchIndex !== -1) {

        //donor
        const donorBranch = branches[donorBranchIndex];
        if (!donorBranch.branchPurchases) {
            donorBranch.branchPurchases = [];
        }
        donorBranch.branchPurchases.push(purchase);
        switch (purchase.fuel) {
            case 'a95':
                donorBranch.currentVolumeA95 -= purchase.liters
                break;
            case 'a100':
                donorBranch.currentVolumeA100 -= purchase.liters
                break;
            case 'diesel':
                donorBranch.currentVolumeDiesel -= purchase.liters
                break;
            default:
                break;
        }
        branches[donorBranchIndex] = donorBranch;

        //recipient
        const recipientBranch = branches[recipientBranchIndex];

        if (!recipientBranch.branchPurchases) {
            recipientBranch.branchPurchases = [];
        }

        recipientBranch.branchPurchases.push(purchase);

        switch (purchase.fuel) {
            case 'a95':
                recipientBranch.currentPriceA95 = parseFloat(
                    (
                        (recipientBranch.currentVolumeA95 * recipientBranch.currentPriceA95 + purchase.liters * purchase.currentPrice) /
                        (recipientBranch.currentVolumeA95 + purchase.liters)
                    ).toFixed(2)
                );                
                    recipientBranch.currentVolumeA95 += purchase.liters
                break;
            case 'a100':
                recipientBranch.currentPriceA100 = parseFloat(
                    (
                        (recipientBranch.currentVolumeA100 * recipientBranch.currentPriceA100 + purchase.liters * purchase.currentPrice) /
                        (recipientBranch.currentVolumeA100 + purchase.liters)
                    ).toFixed(2)
                );
                recipientBranch.currentVolumeA100 += purchase.liters
                break;
            case 'diesel':
                recipientBranch.currentPriceDiesel = parseFloat(
                    (
                        (recipientBranch.currentVolumeDiesel * recipientBranch.currentPriceDiesel + purchase.liters * purchase.currentPrice) /
                        (recipientBranch.currentVolumeDiesel + purchase.liters)
                    ).toFixed(2)
                );
                recipientBranch.currentVolumeDiesel += purchase.liters
                break;
            default:
                break;
        }
        branches[recipientBranchIndex] = recipientBranch;


        const user = users.find(u => u.id === employeeId);       
    
        if (!Array.isArray(user.branchId)) {
            return res.status(400).json({ error: "branchIds should be an array" });
        }
    
        const userBranches = branches.filter((branch) =>
            user.branchId.includes(branch.id)
        );

        res.status(201).json(userBranches);
    } else {
        res.status(404).json({ message: 'Branch not found' });
    }
});


router.post('/fetchFuelBuy', (req, res) => {
    const purchase = req.body;
    purchases.push(purchase);

    const { recipientId } = purchase;

    const recipientBranchIndex = branches.findIndex(branch => branch.id === recipientId);



    if (recipientBranchIndex !== -1) {

        const recipientBranch = branches[recipientBranchIndex];

        if (!recipientBranch.branchPurchases) {
            recipientBranch.branchPurchases = [];
        }

        recipientBranch.branchPurchases.push(purchase);

        switch (purchase.fuel) {
            case 'a95':
                recipientBranch.currentPriceA95 = parseFloat(
                    (
                        (recipientBranch.currentVolumeA95 * recipientBranch.currentPriceA95 + purchase.liters * purchase.currentPrice) /
                        (recipientBranch.currentVolumeA95 + purchase.liters)
                    ).toFixed(2)
                );                
                    recipientBranch.currentVolumeA95 += purchase.liters
                break;
            case 'a100':
                recipientBranch.currentPriceA100 = parseFloat(
                    (
                        (recipientBranch.currentVolumeA100 * recipientBranch.currentPriceA100 + purchase.liters * purchase.currentPrice) /
                        (recipientBranch.currentVolumeA100 + purchase.liters)
                    ).toFixed(2)
                );
                recipientBranch.currentVolumeA100 += purchase.liters
                break;
            case 'diesel':
                recipientBranch.currentPriceDiesel = parseFloat(
                    (
                        (recipientBranch.currentVolumeDiesel * recipientBranch.currentPriceDiesel + purchase.liters * purchase.currentPrice) /
                        (recipientBranch.currentVolumeDiesel + purchase.liters)
                    ).toFixed(2)
                );
                recipientBranch.currentVolumeDiesel += purchase.liters
                break;
            default:
                break;
        }
        branches[recipientBranchIndex] = recipientBranch;


        const user = users.find(u => u.id === purchase.employeeId);
        const userBranches = branches.filter(branch => user.branchId.includes(branch.id));

        res.status(201).json(userBranches);
    } else {
        res.status(404).json({ message: 'Branch not found' });
    }
});


module.exports = router;