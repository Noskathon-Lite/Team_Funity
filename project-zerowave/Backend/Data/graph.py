import matplotlib.pyplot as plt
import pandas as pd

# Load the CSV file
csv = pd.read_csv(r"C:\Users\Gaurav\Desktop\Team_Funity\project-zerowave\Backend\Data\data3.csv")

# Extract the relevant columns
year = csv['Years']
total = csv['CO2(Gg)']

# Plot the data
plt.figure(figsize=(10, 6))  # Set the figure size
plt.plot(year,total , marker='o', linestyle='-', color='b', label='CO2 Emission')  # Customize line graph

total = csv['CH4(Gg)']
plt.plot(year,total , marker='o', linestyle='-', color='b', label='CO2 Emission')  # Customize line graph

total = csv['N2O(Gg)']
plt.plot(year,total , marker='o', linestyle='-', color='b', label='CO2 Emission')  # Customize line graph

total = csv['CO2eq.(Gg)']
plt.plot(year,total , marker='o', linestyle='-', color='b', label='CO2 Emission')  # Customize line graph

# Add labels, title, and legend
# plt.title('Population Over Years', fontsize=16)
plt.xlabel('Census Years', fontsize=14)
plt.ylabel('Total', fontsize=14)
plt.legend()
plt.grid(True)

# Save the plot as an image
output_path = r"C:\Users\Gaurav\Desktop\Team_Funity\project-zerowave\Backend\Data\line_graph3.png"
plt.savefig(output_path, format='png', dpi=300)  # Export as PNG with 300 dpi
plt.show()  # Display the graph
