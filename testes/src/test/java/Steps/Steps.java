package Steps;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.util.concurrent.TimeUnit;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;


import Utilities.DSL;
import io.cucumber.java.pt.*;

public class EcommerceSteps {

	PaginaLogin login;
	AutomaticoPage automatico;
	WebDriver driver;
	JavascriptExecutor je;
	DSL eu;
	
	//Injecao de dependencias para serem utilizadas durante a execucao dos steps
	public EcommerceSteps(ContextStep contextStep) {
		this.driver = contextStep.driver;
		this.eu = contextStep.eu;
		this.je = contextStep.je;
	}

	//Steps
	
}
