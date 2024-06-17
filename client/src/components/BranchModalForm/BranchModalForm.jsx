import React, { useState } from 'react';
import styles from './EditBranchModal.module.css';
import { useSelector } from 'react-redux';


export default function EditBranchModal({ branch, onClose, onSave }) {
    const [formData, setFormData] = useState(branch);
    const { user } = useSelector(state => state.user);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let formDataCopy = { ...formData };
        formDataCopy.tankVolumeA95 = parseFloat(formDataCopy.tankVolumeA95);
        formDataCopy.tankVolumeA100 = parseFloat(formDataCopy.tankVolumeA100);
        formDataCopy.tankVolumeDiesel = parseFloat(formDataCopy.tankVolumeDiesel);
        formDataCopy.currentInterestA95 = parseFloat(formDataCopy.currentInterestA95);
        formDataCopy.currentInterestA100 = parseFloat(formDataCopy.currentInterestA100);
        formDataCopy.currentInterestDiesel = parseFloat(formDataCopy.currentInterestDiesel);
        console.dir(formDataCopy)

        onSave(formDataCopy, user);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                <h2>Branch Information</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Address:
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Type:
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Tank Volume A95:
                            <input
                                type="number"
                                name="tankVolumeA95"
                                value={formData.tankVolumeA95}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Tank Volume A100:
                            <input
                                type="number"
                                name="tankVolumeA100"
                                value={formData.tankVolumeA100}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Tank Volume Diesel:
                            <input
                                type="number"
                                name="tankVolumeDiesel"
                                value={formData.tankVolumeDiesel}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    {/* <div>
                        <label>
                            Current Volume A95:
                            <input
                                type="number"
                                name="currentVolumeA95"
                                value={formData.currentVolumeA95}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Current Volume A100:
                            <input
                                type="number"
                                name="currentVolumeA100"
                                value={formData.currentVolumeA100}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Current Volume Diesel:
                            <input
                                type="number"
                                name="currentVolumeDiesel"
                                value={formData.currentVolumeDiesel}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Current Price A95:
                            <input
                                type="number"
                                step="0.01"
                                name="currentPriceA95"
                                value={formData.currentPriceA95}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Current Price A100:
                            <input
                                type="number"
                                step="0.01"
                                name="currentPriceA100"
                                value={formData.currentPriceA100}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Current Price Diesel:
                            <input
                                type="number"
                                step="0.01"
                                name="currentPriceDiesel"
                                value={formData.currentPriceDiesel}
                                onChange={handleChange}
                            />
                        </label>
                    </div> */}
                    <div>
                        <label>
                            Current Interest A95:
                            <input
                                type="number"
                                step="0.01"
                                name="currentInterestA95"
                                value={formData.currentInterestA95}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Current Interest A100:
                            <input
                                type="number"
                                step="0.01"
                                name="currentInterestA100"
                                value={formData.currentInterestA100}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Current Interest Diesel:
                            <input
                                type="number"
                                step="0.01"
                                name="currentInterestDiesel"
                                value={formData.currentInterestDiesel}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
}
