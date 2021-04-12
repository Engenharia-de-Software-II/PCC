package Steps;


import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.Wait;

import Pages.PaginaLogin;
import Pages.AutomaticoPage;
import Utilities.DSL;
import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.Scenario;
import io.cucumber.java.pt.Dado;
import io.cucumber.java.pt.E;

public class ContextStep {
	
	WebDriver driver;
	PaginaLogin login;
	AutomaticoPage automatico;
	DSL eu;
	Wait<WebDriver> wait;
	JavascriptExecutor je;
	String _url = "";
	
	@Before
	public void Start(Scenario scenario) {
		System.setProperty("webdriver.chrome.driver",
				"C:\\Users\\diego.matos\\Documents\\workspace\\teste-automatizado\\src\\test\\resources\\drivers\\chromedriver.exe");
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--ignore-certificate-errors --no-sandbox");
		driver = new ChromeDriver(options);
		driver.manage().window().maximize();
		driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
		driver.manage().timeouts().pageLoadTimeout(20, TimeUnit.SECONDS);	
		login = new PaginaLogin(driver);
		automatico = new AutomaticoPage(driver);
		eu = new DSL(driver);
		je = (JavascriptExecutor) driver;
	
	}
	
	@After
	public void TearDown() {
		driver.quit();
	}
	
	@Dado("que esteja na pagina de gerenciamento de eventos")
	public void que_esteja_na_pagina_gerenciamento_eventos() {
		driver.navigate().to(_url);
	}

	@Dado("que esteja na pagina de meus ingressos")
	public void que_esteja_na_pagina_meus_ingressos() {
		driver.navigate().to(_url);
	}

	@Dado("que estou na tela de compras de ingresso")
	public void que_esteja_na_pagina_comprar_ingresso() {
		driver.navigate().to(_url);
	}
}
