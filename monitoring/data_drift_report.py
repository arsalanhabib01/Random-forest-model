import datetime
import glob
import pandas as pd
import numpy as np

from evidently.metrics import ColumnDriftMetric
from evidently.metrics import ColumnSummaryMetric
from evidently.metrics import DatasetDriftMetric
from evidently.metrics import DatasetMissingValuesMetric
from evidently.report import Report
from evidently.test_preset import DataDriftTestPreset
from evidently.test_suite import TestSuite
from evidently.ui.dashboards import CounterAgg
from evidently.ui.dashboards import DashboardPanelCounter
from evidently.ui.dashboards import PanelValue
from evidently.ui.dashboards import ReportFilter
from evidently.ui.workspace import Workspace
from evidently.ui.workspace import WorkspaceBase

# path to where ML files are stored
path = 'C:/Users/habibars/Downloads/Network monitoring/intrusion_detection/archive/MachineLearningCVE'
all_files = glob.glob(f"{path}/*.csv")

# concatenate the 8 files into 1
dataset = pd.concat([pd.read_csv(f) for f in all_files])


col_names = ["Destination_Port",
             "Flow_Duration", 
             "Total_Fwd_Packets",
             "Total_Backward_Packets",
             "Total_Length_of_Fwd_Packets", 
             "Total_Length_of_Bwd_Packets", 
             "Fwd_Packet_Length_Max", 
             "Fwd_Packet_Length_Min", 
             "Fwd_Packet_Length_Mean", 
             "Fwd_Packet_Length_Std",
             "Bwd_Packet_Length_Max", 
             "Bwd_Packet_Length_Min", 
             "Bwd_Packet_Length_Mean", 
             "Bwd_Packet_Length_Std",
             "Flow_Bytes_s", 
             "Flow_Packets_s", 
             "Flow_IAT_Mean", 
             "Flow_IAT_Std", 
             "Flow_IAT_Max", 
             "Flow_IAT_Min",
             "Fwd_IAT_Total", 
             "Fwd_IAT_Mean", 
             "Fwd_IAT_Std", 
             "Fwd_IAT_Max", 
             "Fwd_IAT_Min",
             "Bwd_IAT_Total", 
             "Bwd_IAT_Mean", 
             "Bwd_IAT_Std", 
             "Bwd_IAT_Max", 
             "Bwd_IAT_Min",
             "Fwd_PSH_Flags", 
             "Bwd_PSH_Flags", 
             "Fwd_URG_Flags", 
             "Bwd_URG_Flags", 
             "Fwd_Header_Length", 
             "Bwd_Header_Length",
             "Fwd_Packets_s", 
             "Bwd_Packets_s", 
             "Min_Packet_Length", 
             "Max_Packet_Length", 
             "Packet_Length_Mean", 
             "Packet_Length_Std", 
             "Packet_Length_Variance",
             "FIN_Flag_Count", 
             "SYN_Flag_Count", 
             "RST_Flag_Count", 
             "PSH_Flag_Count", 
             "ACK_Flag_Count", 
             "URG_Flag_Count", 
             "CWE_Flag_Count", 
             "ECE_Flag_Count", 
             "Down_Up_Ratio", 
             "Average_Packet_Size", 
             "Avg_Fwd_Segment_Size", 
             "Avg_Bwd_Segment_Size", 
             "Fwd_Header_Length",
             "Fwd_Avg_Bytes_Bulk", 
             "Fwd_Avg_Packets_Bulk", 
             "Fwd_Avg_Bulk_Rate", 
             "Bwd_Avg_Bytes_Bulk", 
             "Bwd_Avg_Packets_Bulk",
             "Bwd_Avg_Bulk_Rate",
             "Subflow_Fwd_Packets", 
             "Subflow_Fwd_Bytes", 
             "Subflow_Bwd_Packets", 
             "Subflow_Bwd_Bytes",
             "Init_Win_bytes_forward", 
             "Init_Win_bytes_backward", 
             "act_data_pkt_fwd", 
             "min_seg_size_forward",
             "Active_Mean", 
             "Active_Std", 
             "Active_Max", 
             "Active_Min",
             "Idle_Mean", 
             "Idle_Std", 
             "Idle_Max", 
             "Idle_Min", 
             "Label"
            ]

#Inspect the Dataset

# Assign the column names
dataset.columns = col_names

# Flow_Bytes_s, Flow_Packets_s are of type object, the rest apart from attack are numeric. 
# However, the data inside these are numeric so will convert them. 
# Also, they have Fwd_Header_Length twice so drop the second occurence.

dataset['Flow_Bytes_s'] = dataset['Flow_Bytes_s'].astype('float64')
dataset['Flow_Packets_s'] = dataset['Flow_Packets_s'].astype('float64')
dataset = dataset.loc[:, ~dataset.columns.duplicated()]


if dataset.isnull().any().any():
    # Replace Inf values with NaN
    dataset = dataset.replace([np.inf, -np.inf], np.nan)
    # Drop all occurences of NaN
    dataset = dataset.dropna()


# Perform data slicing for reference and current data

data_ref = dataset[~dataset['Destination_Port'].isin([54865, 53])].iloc[:5000,:]
data_cur = dataset[dataset['Destination_Port'].isin([54865, 53])].iloc[:5000,:]


WORKSPACE = "workspace"

YOUR_PROJECT_NAME = "New Project"
YOUR_PROJECT_DESCRIPTION = "Test project using dataset."

def create_report(i: int):

    data_drift_report = Report(
        metrics=[
            DatasetDriftMetric(),
            DatasetMissingValuesMetric(),
            ColumnDriftMetric(column_name="Flow_Duration", stattest="wasserstein"),
            ColumnSummaryMetric(column_name="Flow_Duration"),
            ColumnDriftMetric(column_name="Total_Fwd_Packets", stattest="wasserstein"),
            ColumnSummaryMetric(column_name="Total_Fwd_Packets"),
        ],
        timestamp=datetime.datetime.now() + datetime.timedelta(days=i),
    )
    data_drift_report.run(reference_data=data_ref, current_data=data_cur.iloc[100 * i : 100 * (i + 1), :])
    return data_drift_report


def create_test_suite(i: int):
    data_drift_test_suite = TestSuite(
        tests=[DataDriftTestPreset()],
        timestamp=datetime.datetime.now() + datetime.timedelta(days=i),
    )

    data_drift_test_suite.run(reference_data=data_ref, current_data=data_cur.iloc[100 * i : 100 * (i + 1), :])
    return data_drift_test_suite

def create_project(workspace: WorkspaceBase):
    project = workspace.create_project(YOUR_PROJECT_NAME)
    project.description = YOUR_PROJECT_DESCRIPTION
    
    project.dashboard.add_panel(
        DashboardPanelCounter(
            title="Model Calls",
            filter=ReportFilter(metadata_values={}, tag_values=[]),
            value=PanelValue(
                metric_id="DatasetMissingValuesMetric",
                field_path=DatasetMissingValuesMetric.fields.current.number_of_rows,
                legend="count",
            ),
            text="count",
            agg=CounterAgg.SUM,
            size=1,
        )
    )
    project.save()
    return project

def create_demo_project(workspace: str):
    ws = Workspace.create(workspace)
    project = create_project(ws)

    for i in range(0, 5):
        report = create_report(i=i)
        ws.add_report(project.id, report)

        test_suite = create_test_suite(i=i)
        ws.add_test_suite(project.id, test_suite)

if __name__ == "__main__":
    create_demo_project("workspace")

# 1. (Optional) Delete workspace
# If this is not the first run of the script, and you reuse the same project – 
# run the command to delete a previously generated workspace:
    # cd src/evidently/ui/
    # rm -r workspace

# 2. Run the command to generate a new example project as defined in the script above.
    # python data_drift_report.py

# 3. Run the Evidently UI service 
# launch the user interface that will include the defined project.
    # 3.1. If you only want to include your project, run:
        # evidently ui 
    # 3.2. If you want to see both your new project and a standard demo project, run:
        # evidently ui –-demo-project