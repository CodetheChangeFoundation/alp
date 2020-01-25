import React from 'react';
import AdminHeader from '../components/AdminHeader';

const ShiftDataPage = () => {
    return (
        <div>
            <AdminHeader />
			<div className="volunteerDataTable">
					<div className="volunteerDataTableBody">
						<TableComponent data={this.shiftData} />
					</div>
					<div className="lastModified">
						<p>Last cleared: {this.state.dataLastModified.clear || 'Never'}</p>
						<p>Last exported: {this.state.dataLastModified.export || 'Never'}</p>
					</div>
					<div className="volunteerDataButtons">
						<div className="exportBtn">
							<CustomButton size={'small'} color={'primary'} onClick={this.exportData}>
								Export Data
							</CustomButton>
						</div>
						<div className="clearBtn">
							<CustomButton size={'small'} color={'secondary'} onClick={this.clearData}>
								Clear Data
							</CustomButton>
						</div>
					</div>
				</div>
        </div>
    )
}

export default ShiftDataPage;
