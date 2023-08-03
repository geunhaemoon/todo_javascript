const sideToggleButtonOnClickHandle = () => {
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggleButton = document.querySelector(".sidebar-toggle-button");

    if (sidebar.classList.contains("isSidebarOpen")) {
        sidebar.classList.remove("isSidebarOpen");
        sidebarToggleButton.innerHTML = '▶';
        
    } else {
        sidebar.classList.add("isSidebarOpen");
        sidebarToggleButton.innerHTML = '◀';
    }

}