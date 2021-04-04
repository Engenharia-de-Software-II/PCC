package Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import Utilities.DSL;

public class PaginaBase {
	
	WebDriver driver;
	DSL eu;
	
	//PAGINA BASE, SUPER CLASSE DAS OUTRAS CLASSES PAGES.
	
	//aqui ficarao contido os metodos e elementos que sao encontrados em todo o sistema (ex: cabecalho, rodape do site)
	public PaginaBase(WebDriver driver) {
		this.driver = driver;
		eu = new DSL(driver);
	}

}
