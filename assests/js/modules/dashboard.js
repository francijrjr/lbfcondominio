class DashboardController{
    init(){
        lucide.createIcons();
        console.log("Dashboard carregado");
    }
}

const dashboardController =
    new DashboardController();
dashboardController.init();